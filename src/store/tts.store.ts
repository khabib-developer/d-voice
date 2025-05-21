import { defaultText } from "@/z_shared/constants";
import { ITTSStore } from "@/z_shared/types";
import { create } from "zustand";

export const useTTSStore = create<ITTSStore>((set, get) => ({
  loading: false,
  isPlaying: false,
  text: defaultText,
  model: "",
  requested: false,
  ctx: null,
  reader: null,

  totalDuration: 0,
  currentTime: 0,
  timerId: null,
  startTimestamp: 0,

  fullBuffer: null,

  setModel(model) {
    set({ model, requested: false });
  },
  setText(text) {
    set({ text, requested: false });
  },

  async sendText() {
    const { text, model, requested, ctx, isPlaying, loading, tick } = get();

    if (loading) return;

    // 1) Toggle pause/resume if streaming or replaying
    if (ctx && requested) {
      if (isPlaying) {
        await ctx.suspend();
        if (get().timerId != null) cancelAnimationFrame(get().timerId!);
        set({ isPlaying: false });
      } else {
        await ctx.resume();
        set({ isPlaying: true });
        tick();
      }
      return;
    }

    // 2) If fullBuffer exists (replay case), start from beginning
    if (!ctx && requested && get().fullBuffer) {
      this.playFullBuffer(0);
      return;
    }

    // 3) First-time play: fetch and stream
    if (!text || !model) return;
    if (requested) return;
    set({ loading: true });

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, text }),
    });
    set({ requested: true, loading: false });
    if (!res.body) return;

    const audioCtx = new AudioContext();
    const reader = res.body.getReader();
    set({ ctx: audioCtx, reader, requested: true });

    // Collect raw bytes
    const chunks: Uint8Array[] = [];
    let streamLen = 0;

    // Read all chunks
    async function pump() {
      const { done, value } = await reader.read();
      if (done) {
        // concatenate
        const fullBytes = new Uint8Array(streamLen);
        let offset = 0;
        for (const chunk of chunks) {
          fullBytes.set(chunk, offset);
          offset += chunk.length;
        }
        // decode full buffer
        const buffer = await audioCtx.decodeAudioData(fullBytes.buffer);
        // store and play
        set({ fullBuffer: buffer, totalDuration: buffer.duration });
        get().playFullBuffer(0);
        return;
      }
      chunks.push(value);
      streamLen += value.length;
      await pump();
    }
    pump();
  },

  // helper to play merged fullBuffer from an offset
  playFullBuffer(offset: number) {
    const { fullBuffer, timerId, tick, ctx } = get();
    // Stop and close previous context to halt any ongoing audio
    if (timerId != null) cancelAnimationFrame(timerId);
    if (ctx) {
      ctx.close();
    }
    if (!fullBuffer) return;

    // Create new context & source
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = fullBuffer;
    source.connect(audioCtx.destination);

    // Compute new start timestamp
    const startTS = audioCtx.currentTime - offset;
    set({
      ctx: audioCtx,
      isPlaying: true,
      startTimestamp: startTS,
      currentTime: offset,
    });

    // Start playback at offset
    source.start(0, offset);
    source.addEventListener("ended", get().onAudioFinish);

    // Start RAF ticking
    tick();
  },

  seekTo(seconds: number) {
    get().playFullBuffer(seconds);
  },

  onAudioFinish() {
    const { timerId, ctx } = get();
    if (timerId != null) cancelAnimationFrame(timerId);
    ctx?.close();
    set({ isPlaying: false, ctx: null, requested: false });
  },

  tick() {
    const { ctx, startTimestamp } = get();
    if (!ctx) return;
    const now = ctx.currentTime - startTimestamp;
    set({ currentTime: now });
    if (get().isPlaying) {
      const id = requestAnimationFrame(get().tick);
      set({ timerId: id });
    }
  },
}));
