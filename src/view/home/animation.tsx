"use client";
import { useEffect, useRef } from "react";
import { bgAnimation } from "@/z_shared/lib/animation";
import { useTheme } from "next-themes";
import { useTTSStore } from "@/store/tts.store";
export const BackgroundAnimation = () => {
  const { resolvedTheme } = useTheme();
  const { loading, isPlaying } = useTTSStore();
  const speedRef = useRef(1);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const cleanup = bgAnimation(resolvedTheme, { speedRef, isPlayingRef });
    return () => cleanup();
  }, [resolvedTheme]);

  // Example: update speed or playing status on demand
  useEffect(() => {
    speedRef.current = loading ? 20 : isPlaying ? 8 : 1; // change speed anytime
    isPlayingRef.current = isPlaying; // toggle colorful mode
  }, [loading, isPlaying]);

  return (
    <div className="w-full h-[200px] absolute -z-10 top-5">
      <canvas id="canvas" height={200}></canvas>
    </div>
  );
};
