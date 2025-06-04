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
  // ─────────────────────────────────────────────────────────────
  // Simple Setters
  // ─────────────────────────────────────────────────────────────
  setRecaptchaToken(token) {
    set({ recaptchaToken: token });
  },
  setLimit(limit) {
    set({ limit });
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
    set({ model });
  },
  setText(text) {
    set({ text });
  },

  // ─────────────────────────────────────────────────────────────
  // 1) sendText: fire off the TTS request, get `amount`, reset state
  // ─────────────────────────────────────────────────────────────
  async sendText() {
    const { text, model, loading, getCaptchaToken, isPlaying } = get();
    if (loading) return;

    if (isPlaying) {
      const { ctx } = get();
      if (!ctx) return;
      ctx.suspend();
      set({ isPlaying: false });

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
    });

    // Immediately begin fetching + decoding chunk #0
    get().getChunks();
  },

  // ─────────────────────────────────────────────────────────────
  // 2) getChunks: fetch the next chunk, decode it, schedule playback
  // ─────────────────────────────────────────────────────────────
  async getChunks() {
    const { chunkIndex, max, ctx, mask, downloaded, duration } = get();
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
    } else {
      source.addEventListener("ended", () => {
        set({ isPlaying: false });
      });
    }
  },

  async loadWasm() {
    await initWasm({ wasmUrl: "/wasm/wasm_decryptor_bg.wasm" });
    set({ wasmReady: true });
  },

  trackProgress() {
    const tick = () => {
      const { ctx, duration, isPlaying } = get();
      if (!ctx || !duration || !isPlaying) return;

      const currentTime = ctx.currentTime;
      const percent = Math.min((currentTime / duration) * 100, 100);
      set({ progress: percent });

      if (percent < 100 && isPlaying) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  },
}));
