type MaskInfo = {
  mask: Buffer;
};

export const maskStore: Record<string, MaskInfo> = {};

export function xorBuffer(buffer: Buffer, mask: Buffer): Buffer {
  const out = Buffer.alloc(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = buffer[i] ^ mask[i % mask.length];
  }
  return out;
}
