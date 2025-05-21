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
  srcNode: null,
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
    const {
      text,
      model,
      requested,
      ctx,
      reader,
      isPlaying,
      loading,
      tick,
      totalDuration,
      fullBuffer,
      onAudioFinish,
    } = get();

    if (loading) return;

    // Toggle pause/resume if already initialized

    if (!requested && isPlaying && ctx) {
      await ctx.suspend();
      const { timerId } = get();
      if (timerId != null) cancelAnimationFrame(timerId);
      set({ isPlaying: false });
      return;
    }

    if (ctx && reader && requested) {
      if (isPlaying) {
        await ctx.suspend();
        if (get().timerId != null) cancelAnimationFrame(get().timerId!);
        set({ isPlaying: false });
      } else {
        ctx.resume();
        console.log("resume");
        tick();
      }
      return;
    }

    if (!ctx && requested) {
      const audioCtx = new AudioContext();
      set({ ctx: audioCtx, startTimestamp: 0 });
      const srcNode = audioCtx.createBufferSource();
      srcNode.buffer = fullBuffer;
      srcNode.connect(audioCtx.destination);
      srcNode.start(0);
      srcNode.addEventListener("ended", onAudioFinish);
      tick();
      return;
    }

    if (!text || !model) return;
    if (requested) return;
    set({ loading: true });

    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, text }),
    });

    set({ requested: true, loading: false });
    if (!response.body) return;
    const audioCtx = new AudioContext();
    const audioReader = response.body.getReader();
    set({
      ctx: audioCtx,
      reader: audioReader,
      totalDuration: 0,
      startTimestamp: 0,
    });

    tick();

    const buffers: AudioBuffer[] = [];

    // Stream & schedule chunks continuously
    let playTime = audioCtx.currentTime;

    // async function pump() {
    //   const { done, value } = await audioReader.read();
    //   console.log(value);
    //   if (done) {
    //     set({ fullBuffer: mergeAudioBuffers(audioCtx, buffers) });

    //     return;
    //   }

    //   try {
    //     const buffer = await audioCtx.decodeAudioData(
    //       value.buffer as ArrayBuffer
    //     );
    //     buffers.push(buffer);

    //     // accumulate total duration for progress denominator
    //     set((s) => ({ totalDuration: s.totalDuration + buffer.duration }));

    //     const srcNode = audioCtx.createBufferSource();
    //     srcNode.buffer = buffer;
    //     srcNode.connect(audioCtx.destination);
    //     srcNode.start(playTime);
    //     srcNode.addEventListener("ended", onAudioFinish);
    //     playTime += buffer.duration;
    //   } catch (err) {
    //     console.error("decode/play chunk failed", err);
    //   }

    //   // continue reading even if paused, so totalDuration completes
    //   await pump();
    // }

    let streamBuffer = new Uint8Array(); // collect full audio stream

    async function pump() {
      const { done, value } = await audioReader.read();
      if (done) {
        try {
          const audioBuffer = await audioCtx.decodeAudioData(
            streamBuffer.buffer
          );
          set({ fullBuffer: audioBuffer });

          const srcNode = audioCtx.createBufferSource();
          srcNode.buffer = audioBuffer;
          srcNode.connect(audioCtx.destination);
          srcNode.start(0);
          srcNode.addEventListener("ended", onAudioFinish);

          tick();
        } catch (e) {
          console.error("decodeAudioData failed on full buffer", e);
        }
        return;
      }

      // Append current chunk
      const newBuffer = new Uint8Array(streamBuffer.length + value.length);
      newBuffer.set(streamBuffer);
      newBuffer.set(value, streamBuffer.length);
      streamBuffer = newBuffer;

      await pump();
    }

    pump();
  },

  seekTo(seconds) {
    const { fullBuffer, ctx, timerId, tick, onAudioFinish, startTimestamp } =
      get();
    if (!fullBuffer) return;

    // 1) Stop & clean up the old context
    if (timerId != null) cancelAnimationFrame(timerId);
    if (ctx) {
      ctx.close();
    }

    // 2) Build a fresh context and source node
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    source.buffer = fullBuffer;
    source.connect(audioCtx.destination);

    // 3) Record new startTimestamp against which we'll measure currentTime
    const startTS = audioCtx.currentTime - seconds;
    // so that: audioCtx.currentTime - startTS === toSeconds at the moment play begins

    set({
      ctx: audioCtx,
      requested: true, // we already have fullBuffer
      isPlaying: true,
      timerId: null,
      startTimestamp: startTS,
      currentTime: seconds,
    });

    // 4) Start playback *at* the offset
    source.start(0, seconds);
    source.addEventListener("ended", onAudioFinish);

    // 5) Kick off the RAF loop to update currentTime
    tick();
  },

  onAudioFinish(ev) {
    const { timerId, ctx } = get();
    if (timerId != null) cancelAnimationFrame(timerId);
    ctx?.close();
    set({
      isPlaying: false,
      ctx: null,
    });
  },

  tick() {
    set({ isPlaying: true });
    const { ctx, tick, isPlaying, startTimestamp } = get();
    if (!ctx) return;

    set({ currentTime: ctx.currentTime - startTimestamp });
    if (isPlaying) set({ timerId: requestAnimationFrame(tick) });
  },
}));

function mergeAudioBuffers(
  audioCtx: AudioContext,
  buffers: AudioBuffer[]
): AudioBuffer {
  const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
  const sampleRate = buffers[0].sampleRate;
  const numberOfChannels = buffers[0].numberOfChannels;

  const mergedBuffer = audioCtx.createBuffer(
    numberOfChannels,
    totalLength,
    sampleRate
  );

  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = mergedBuffer.getChannelData(channel);
    let offset = 0;

    for (const buffer of buffers) {
      const data = buffer.getChannelData(channel);
      channelData.set(data, offset);
      offset += buffer.length;
    }
  }

  return mergedBuffer;
}
