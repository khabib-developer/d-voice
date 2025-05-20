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
  srcNode: AudioBufferSourceNode | null;
  loading: boolean;
  isPlaying: boolean;
  text: string;
  model: string;
  requested: boolean;
  reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>> | null;

  fullBuffer: null | AudioBuffer;

  totalDuration: number;
  currentTime: number;
  timerId: number | null;
  startTimestamp: number;

  setModel: (model: string) => void;
  setText: (text: string) => void;
  sendText: () => void;

  onAudioFinish: (ev: Event) => void;

  seekTo: (seconds: number) => void;

  tick: () => void;
}

export interface RootLayoutProps {
  children: ReactNode;
}
