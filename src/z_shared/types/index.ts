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
  ctx: AudioContext | null;
  loading: boolean;
  isPlaying: boolean;
  text: string;
  model: string;
  requested: boolean;
  reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>> | null;

  limit: boolean;
  setLimit: (limit: boolean) => void;

  recaptchaToken: string | null;
  setRecaptchaToken: (token: string) => void;

  fullBuffer: null | AudioBuffer;

  totalDuration: number;
  currentTime: number;
  timerId: number | null;
  startTimestamp: number;

  getCaptchaToken: () => Promise<string>;

  setModel: (model: string) => void;
  setText: (text: string) => void;
  sendText: () => void;

  onAudioFinish: (ev: Event) => void;

  playFullBuffer: (offset: number) => void;

  seekTo: (seconds: number) => void;

  tick: () => void;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface IAppStore {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}
