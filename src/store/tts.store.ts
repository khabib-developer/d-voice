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

  limit: false,
  setLimit(limit) {
    set({ limit });
  },

  recaptchaToken: null,
  setRecaptchaToken(token) {
    set({ recaptchaToken: token });
  },

  async getCaptchaToken() {
    return new Promise<string>((resolve) => {
      if ((window as any).grecaptcha) {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
              action: "tts",
            })
            .then(resolve);
        });
      }
    });
  },

  setModel(model) {
    set({ model, requested: false });
  },
  setText(text) {
    set({ text, requested: false });
  },

  async sendText() {
    const {
      text,
      model,
      requested,
      fullBuffer,
      ctx,
      loading,
      tick,
      getCaptchaToken,
    } = get();

    // Prevent duplicate requests
    if (loading) return;

    // 1) If audio is already loaded (requested) then just play or resume
    if (requested && fullBuffer) {
      // if context exists, toggle pause/resume
      if (ctx) {
        if (get().isPlaying) {
          await ctx.suspend();
          if (get().timerId) cancelAnimationFrame(get().timerId!);
          set({ isPlaying: false, loading: false });
        } else {
          await ctx.resume();
          set({ isPlaying: true, loading: false });
          tick();
        }
      } else {
        // no context: first playback of stored buffer
        get().playFullBuffer(0);
      }
      return;
    }

    // 2) First-time fetch and buffer
    if (!text || !model) return;
    set({ loading: true });

    const recaptchaToken = await getCaptchaToken();

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, text, recaptchaToken }),
    });
    if (res.status === 429) {
      set({ loading: false, limit: true });
      return;
    }
    if (res.status !== 200 || !res.body) {
      set({ loading: false });
      return;
    }

    const audioCtx = new AudioContext();
    const reader = res.body.getReader();
    set({ requested: true });

    // gather all chunks
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      length += value.length;
    }

    // concatenate and decode
    const bufferData = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bufferData.set(chunk, offset);
      offset += chunk.length;
    }
    const decoded = await audioCtx.decodeAudioData(bufferData.buffer);
    set({ fullBuffer: decoded, totalDuration: decoded.duration });

    // clear loading and play
    set({ loading: false });
    get().playFullBuffer(0);
  },

  // helper to play merged fullBuffer from an offset
  playFullBuffer(offset: number) {
    const { fullBuffer, timerId } = get();
    if (!fullBuffer) return;

    // clean existing
    if (timerId) cancelAnimationFrame(timerId);
    const oldCtx = get().ctx;
    if (oldCtx) oldCtx.close();

    // new context & source
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = fullBuffer;
    source.connect(audioCtx.destination);

    // set state for tracking
    const startTS = audioCtx.currentTime - offset;
    set({
      ctx: audioCtx,
      isPlaying: true,
      startTimestamp: startTS,
      currentTime: offset,
    });

    // start playback
    source.start(0, offset);
    source.addEventListener("ended", get().onAudioFinish);

    // kick off tick
    get().tick();
  },

  seekTo(seconds: number) {
    get().playFullBuffer(seconds);
  },

  onAudioFinish() {
    const { timerId, ctx } = get();
    if (timerId) cancelAnimationFrame(timerId);
    if (ctx) ctx.close();
    set({ isPlaying: false, ctx: null });
  },

  tick() {
    const { ctx, startTimestamp, isPlaying } = get();
    if (!ctx) return;
    const now = ctx.currentTime - startTimestamp;
    set({ currentTime: now });
    if (isPlaying) {
      const id = requestAnimationFrame(get().tick);
      set({ timerId: id });
    }
  },
}));
