export function getWavDuration(buffer: Buffer): number {
  const byteRate = buffer.readUInt32LE(28); // Bytes per second
  const dataSize = buffer.readUInt32LE(40); // Data chunk size
  return dataSize / byteRate; // duration in seconds
}
