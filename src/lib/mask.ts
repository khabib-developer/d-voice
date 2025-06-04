import { randomBytes } from "crypto";

type MaskInfo = {
  mask: Buffer;
};

class MaskStore {
  private store: Record<string, Buffer> = {};

  set(sessionId: string) {
    const mask = randomBytes(16);
    this.store[sessionId] = mask;
    return mask.toString("base64");
  }

  get(sessionId: string) {
    return this.store[sessionId];
  }
}

export const maskStore = new MaskStore();

export function xorBuffer(buffer: Buffer, mask: Buffer): Buffer {
  const out = Buffer.alloc(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = buffer[i] ^ mask[i % mask.length];
  }
  return out;
}
