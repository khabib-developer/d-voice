// components/DRMAudioPlayer.tsx
"use client";
import React, { useEffect, useRef } from "react";
import shaka from "shaka-player";

export default function DRMAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    const player = new shaka.Player(audioRef.current);

    // Configure the Widevine license server
    player.configure({
      drm: {
        servers: {
          "com.widevine.alpha": "http://localhost:3000/api/license",
        },
      },
    });

    player.load("/encrypted/audio.mpd").catch((e: any) => {
      console.error("Error loading DRM stream", e);
    });

    return () => player.destroy();
  }, []);

  return <audio ref={audioRef} controls />;
}
