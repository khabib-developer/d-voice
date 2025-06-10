import { ReactNode } from "react";

export type ModelNames = {
  name: string;
  single_price: number;
  stream_price: number;
};

export type Tariff = {
  id: number;
  name: string;
  dcoin: number;
  price: number;
  disposal: number;
};
export interface ITTSStore {
  loading: boolean;
  isPlaying: boolean;
  text: string;
  model: string;
  ctx: AudioContext | null;
  index: number;
  chunkIndex: number;
  max: number;
  nextPlayTime: number;
  recaptchaToken: string | null;
  limit: boolean;
  mask: Uint8Array | null;
  wasmReady: boolean;
  downloaded: number;
  duration: number;
  progress: number;
  requested: boolean;
  audioBuffers: AudioBuffer[];
  playStartTime: number;
  audio: HTMLAudioElement | null;

  loadWasm: () => void;
  setRecaptchaToken: (token: string) => void;
  setLimit: (limit: boolean) => void;
  getCaptchaToken: () => Promise<string>;
  setModel: (model: string) => void;
  setText: (text: string) => void;

  sendText: () => Promise<void>;

  sendTextMobile: () => Promise<void>;

  getChunks: () => Promise<void>;
  connectAndPlay: (buffer: AudioBuffer) => void;

  replay: () => void;
  trackProgress: () => void;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface IAppStore {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}
