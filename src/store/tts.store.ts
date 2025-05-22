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

  // Main play/pause/stream function
  async sendText() {
    const state = get();
    const {
      text,
      model,
      requested,
      fullBuffer,
      loading,
      tick,
      getCaptchaToken,
      limit,
    } = state;

    // 1) Ensure AudioContext exists in user gesture
    let audioCtx = state.ctx;
    if (!audioCtx || audioCtx.state === "closed") {
      audioCtx = new AudioContext();
      set({ ctx: audioCtx });
    }
    // Resume if suspended (especially on iOS)
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    // Prevent duplicate network calls
    if (loading) return;

    // 2) If already fetched: toggle play/pause or replay
    if (requested && fullBuffer) {
      if (state.isPlaying) {
        await audioCtx.suspend();
        if (state.timerId) cancelAnimationFrame(state.timerId);
        set({ isPlaying: false, loading: false });
      } else {
        // if context closed, or new playback, use playFullBuffer
        if (!state.ctx) {
          set({ ctx: audioCtx });
          get().playFullBuffer(state.currentTime);
        } else {
          await audioCtx.resume();
          set({ isPlaying: true, loading: false });
          tick();
        }
      }
      return;
    }

    // 3) First-time fetch
    if (!text || !model) return;
    set({ loading: true, limit: false });

    // reCAPTCHA may delay, but context already unlocked
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

    const reader = res.body.getReader();
    set({ requested: true });

    // Collect and decode full stream
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      length += value.length;
    }
    const bufferData = new Uint8Array(length);
    let offset = 0;
    chunks.forEach((c) => {
      bufferData.set(c, offset);
      offset += c.length;
    });
    const decoded = await audioCtx.decodeAudioData(bufferData.buffer);
    set({
      fullBuffer: decoded,
      totalDuration: decoded.duration,
      loading: false,
    });

    // Start playback
    get().playFullBuffer(0);
  },

  // Play buffer from offset
  playFullBuffer(offset: number) {
    const state = get();
    const { fullBuffer, timerId } = state;
    if (!fullBuffer) return;

    // Clean previous context
    if (timerId) cancelAnimationFrame(timerId);
    if (state.ctx) state.ctx.close();

    // Create fresh AudioContext
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = fullBuffer;
    source.connect(audioCtx.destination);

    // Start at offset
    const startTS = audioCtx.currentTime - offset;
    set({
      ctx: audioCtx,
      isPlaying: true,
      startTimestamp: startTS,
      currentTime: offset,
    });

    source.start(0, offset);
    source.addEventListener("ended", get().onAudioFinish);

    get().tick();
  },

  seekTo(seconds: number) {
    get().playFullBuffer(seconds);
  },

  onAudioFinish() {
    const state = get();
    if (state.timerId) cancelAnimationFrame(state.timerId);
    if (state.ctx) state.ctx.close();
    set({ isPlaying: false, ctx: null, requested: false });
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
