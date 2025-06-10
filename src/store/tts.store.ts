import { defaultText } from "@/z_shared/constants";
import { ITTSStore } from "@/z_shared/types";
import { create } from "zustand";

import initWasm, {
  base64_decode,
  buffer_decode,
} from "../../public/wasm/wasm_decryptor";

const development = process.env.NODE_ENV === "development";

export const useTTSStore = create<ITTSStore>((set, get) => ({
  // ─────────────────────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────────────────────
  loading: false,
  isPlaying: false,
  text: defaultText,
  model: "",
  ctx: null,
  index: 0,
  chunkIndex: 0,
  max: 0,
  nextPlayTime: 0,
  recaptchaToken: null,
  limit: false,
  mask: null,
  wasmReady: false,
  downloaded: 0,
  duration: 0,
  progress: 0,
  requested: false,
  audioBuffers: [],
  playStartTime: 0,
  audio: null,
  // ─────────────────────────────────────────────────────────────
  // Simple Setters
  // ─────────────────────────────────────────────────────────────
  setRecaptchaToken(token) {
    set({ recaptchaToken: token });
  },
  setLimit(limit) {
    set({ limit });
  },
  setModel(model) {
    set({ model });
  },
  setText(text) {
    set({ text, requested: false, audio: null });
  },
  // ─────────────────────────────────────────────────────────────
  // Google captcha
  // ─────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // 1) sendText: fire off the TTS request, get `amount`, reset state
  // ─────────────────────────────────────────────────────────────
  async sendText() {
    const {
      text,
      model,
      loading,
      getCaptchaToken,
      isPlaying,
      ctx,
      chunkIndex,
      requested,
      index,
      max,
    } = get();
    if (loading) return;

    if (isPlaying && ctx) {
      ctx.suspend();
      set({ isPlaying: false });
      return;
    }

    if (ctx && !isPlaying && chunkIndex > 0 && index < max && requested) {
      // Just resume playback without refetching
      await ctx.resume();
      set({ isPlaying: true });
      get().trackProgress();
      return;
    }

    if (ctx && !isPlaying && index >= max && requested) {
      get().replay();

      return;
    }

    set({ loading: true });
    const recaptchaToken = development ? "" : await getCaptchaToken();
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, text, recaptchaToken }),
    });

    if (response.status === 429) {
      set({ limit: true, loading: false });
      return;
    }

    if (!response.ok || !response.body) {
      set({ loading: false });
      return;
    }

    // We expect JSON: { amount: number }
    const { amount, mask, duration } = (await response.json()) as {
      amount: number;
      mask: string;
      duration: number;
    };

    // Create a fresh AudioContext and reset all playback‐related state:
    const audioCtx = new AudioContext();
    set({
      ctx: audioCtx,
      isPlaying: false,
      index: 0,
      chunkIndex: 0,
      max: amount,
      nextPlayTime: 0,
      mask: base64_decode(mask),
      duration,
      downloaded: 0,
      progress: 0,
      audioBuffers: [],
      playStartTime: audioCtx.currentTime,
    });

    // Immediately begin fetching + decoding chunk #0
    get().getChunks();
  },

  async sendTextMobile() {
    const {
      text,
      model,
      loading,
      getCaptchaToken,
      audio: a,
      isPlaying,
    } = get();

    if (loading) return;

    if (a) {
      if (isPlaying) {
        a.pause();
        set({ isPlaying: false });
      } else {
        a.play();
        set({ isPlaying: true });
      }

      return;
    }

    const audio = new Audio();
    set({ loading: true, audio });

    const recaptchaToken = development ? "" : await getCaptchaToken();
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, text, recaptchaToken }),
    });

    if (response.status === 429) {
      set({ limit: true, loading: false });
      return;
    }

    if (!response.ok || !response.body) {
      set({ loading: false });
      return;
    }
    const arrayBuffer = await response.arrayBuffer();

    // 3) Create a blob URL and store it
    const blob = new Blob([arrayBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    audio.src = url;
    audio.load();
    set({ downloaded: 100 });
    audio.play();
    set({ isPlaying: true, loading: false, progress: 0 });
    audio.addEventListener("timeupdate", (ev) => {
      set({ progress: (audio.currentTime / audio.duration) * 100 });
    });
    audio.addEventListener("ended", () => {
      set({ isPlaying: false });
    });
  },

  // ─────────────────────────────────────────────────────────────
  // 2) getChunks: fetch the next chunk, decode it, schedule playback
  // ─────────────────────────────────────────────────────────────
  async getChunks() {
    const { chunkIndex, max, ctx, mask, downloaded, duration, audioBuffers } =
      get();
    if (!ctx || !mask) return;
    if (chunkIndex >= max) return;

    try {
      // Fetch the next TTS chunk from your endpoint:
      const response = await fetch("/api/tts");
      if (!response.ok || !response.body) {
        return;
      }
      const scrambled = await response.arrayBuffer();

      const scrambledU8 = new Uint8Array(scrambled);

      // 2) Un-XOR it using our mask:
      const unscrambledU8 = buffer_decode(scrambledU8, mask!);

      const rawBuffer = unscrambledU8.buffer;

      // 3) Decode the real WAV chunk:
      const audioBuffer = await ctx.decodeAudioData(rawBuffer as any);

      const chunkDuration = audioBuffer.length / audioBuffer.sampleRate;

      // Increment chunkIndex so we know how many we've processed
      set({
        audioBuffers: [...audioBuffers, audioBuffer],
        chunkIndex: chunkIndex + 1,
        downloaded: downloaded + (chunkDuration * 100) / duration,
      });

      // Schedule this chunk immediately
      get().connectAndPlay(audioBuffer);
    } catch (err) {
      console.error("Error in getChunks:", err);
    }
  },

  // ─────────────────────────────────────────────────────────────
  // 3) connectAndPlay: schedule each decoded AudioBuffer exactly at nextPlayTime
  // ─────────────────────────────────────────────────────────────
  connectAndPlay(buffer) {
    const { ctx, nextPlayTime, chunkIndex, max } = get();
    if (!ctx) return;

    // Create a new BufferSource for this chunk
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    // Determine when to start: either nextPlayTime (if still in future) or “right now”
    const now = ctx.currentTime;
    const startAt = nextPlayTime > now ? nextPlayTime : now;

    // Schedule the chunk at exactly startAt
    source.start(startAt);

    // Add to sourceNodes array (in case you want to stop everything later)
    set({
      isPlaying: true,
      loading: false,
      // Update nextPlayTime to be “end of this chunk”
      nextPlayTime: startAt + buffer.duration,
    });

    get().trackProgress();

    // As soon as we schedule chunk N, begin fetching + decoding chunk N+1 (if any left)
    if (chunkIndex < max) {
      get().getChunks();
      source.addEventListener("ended", () => {
        set((state) => ({ index: state.index + 1 }));
      });
    } else {
      set({ requested: true });
      source.addEventListener("ended", () => {
        set({ isPlaying: false, index: max });
      });
    }
  },

  async loadWasm() {
    await initWasm({ wasmUrl: "/wasm/wasm_decryptor_bg.wasm" });
    set({ wasmReady: true });
  },

  replay() {
    const { ctx, audioBuffers } = get();
    if (!ctx) return;
    if (audioBuffers.length === 0) return;

    // Reset progress‐related state
    set({
      isPlaying: false,
      index: 0,
      nextPlayTime: 0,
      progress: 0,
      downloaded: 100,
      playStartTime: ctx.currentTime,
    });

    // Use current AudioContext time as the baseline
    const now = ctx.currentTime;
    let scheduleTime = now;

    // Schedule each buffer back-to-back
    audioBuffers.forEach((buffer, i) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      source.start(scheduleTime);
      // Once the final chunk ends, flip isPlaying to false:
      if (i === audioBuffers.length - 1) {
        source.addEventListener("ended", () => {
          set({ isPlaying: false });
        });
      }
      scheduleTime += buffer.duration;
    });

    // Mark as playing and start tracking progress
    set({
      isPlaying: true,
      nextPlayTime: scheduleTime,
      // Since everything is in memory, `downloaded` can remain at 100%
    });
    get().trackProgress();
  },

  trackProgress() {
    const tick = () => {
      const { ctx, duration, isPlaying, playStartTime } = get();
      if (!ctx || !duration || !isPlaying) return;

      const elapsed = ctx.currentTime - playStartTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      set({ progress: percent });

      if (percent < 100 && isPlaying) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  },
}));
