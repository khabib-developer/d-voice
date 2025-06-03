import { promises as fs } from "fs";
import * as path from "path";
import { sessionTime } from "./contstants";

class AudioMap {
  private chunkCollection: Record<string, AudioChunk> = {};
  private timeOuts: Record<string, number> = {};

  constructor() {}

  async set(sessionId: string, buffer: Buffer, duration: number) {
    const targetChunkDuration = 0.4; // seconds per chunk
    const amount = Math.max(1, Math.ceil(duration / targetChunkDuration));

    console.log(amount);

    const buffers = await this.divideIntoEqualParts(buffer, amount);

    this.chunkCollection[sessionId] = new AudioChunk(buffers, duration);
    this.clear(sessionId);
    return { duration, amount };
  }

  get(sessionId: string) {
    const [data, lastChunk] = this.chunkCollection[sessionId]?.getBuffer();
    if (lastChunk) {
      clearTimeout(this.timeOuts[sessionId]);
      delete this.chunkCollection[sessionId];
      delete this.timeOuts[sessionId];
    }

    return data;
  }

  private clear(sessionId: string) {
    if (this.timeOuts[sessionId]) clearTimeout(this.timeOuts[sessionId]);
    setTimeout(() => {
      delete this.timeOuts[sessionId];
      delete this.chunkCollection[sessionId];
    }, sessionTime);
  }

  private async divideIntoEqualParts(
    buffer: Buffer,
    n: number
  ): Promise<Buffer[]> {
    if (n <= 0) {
      throw new Error("Number of parts (n) must be greater than zero");
    }

    const WAV_HEADER_SIZE = 44;
    const rawPCM = buffer.slice(WAV_HEADER_SIZE); // drop the 44-byte header
    const rawPCMLength = rawPCM.length;

    // For 16-bit mono, each sample frame is 2 bytes. Make sure each chunk size
    // is a multiple of 2 so you don’t split a sample in half.
    const bytesPerSample = 2; // (bitsPerSample/8 * numChannels) = (16/8 * 1)
    const basePartSizeUnaligned = Math.floor(rawPCMLength / n);
    const basePartSize =
      Math.floor(basePartSizeUnaligned / bytesPerSample) * bytesPerSample;

    const parts: Buffer[] = [];
    let offset = 0;

    for (let i = 0; i < n; i++) {
      // For the last chunk, include whatever is left (and round it down to bytesPerSample multiple)
      const isLast = i === n - 1;
      const end = isLast ? rawPCMLength : offset + basePartSize;

      // If end is not aligned to bytesPerSample (shouldn't happen if basePartSize was aligned),
      // force-align it anyway:
      const alignedEnd = Math.floor(end / bytesPerSample) * bytesPerSample;
      const chunkData = rawPCM.slice(offset, alignedEnd);

      // Build a fresh 44-byte WAV header for this chunkData length:
      const header = createWavHeader(chunkData.length);

      // Concatenate header + PCM
      const fullWavChunk = Buffer.concat([header, chunkData]);

      // Optional: write to disk (for debugging), then push into parts[]
      const filePath = path.join(__dirname, `chunk-${i}.wav`);
      await fs.writeFile(filePath, fullWavChunk);

      parts.push(fullWavChunk);
      offset = alignedEnd;
    }

    return parts;
  }
}

class AudioChunk {
  private index = 0;
  constructor(private buffers: Buffer[], private duration: number) {}

  private incrementIndex() {
    this.index++;
  }

  getBuffer() {
    const buffer = this.buffers[this.index];
    this.incrementIndex();
    return [buffer, this.index === this.buffers.length];
  }

  getDuration() {
    return this.duration;
  }
}

function createWavHeader(
  dataLength: number,
  sampleRate = 44100,
  numChannels = 1,
  bitsPerSample = 16
): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const buffer = Buffer.alloc(44);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataLength, 4); // file size minus 8
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat = 1 (PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataLength, 40); // data subchunk size

  return buffer;
}

export const audioMap = new AudioMap();
