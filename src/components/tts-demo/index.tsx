"use client";

import { useTTSStore } from "@/store/tts.store";
import { defaultText, theme } from "@/z_shared/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/z_shared/ui/select";
import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { FaPlay } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { FaPause } from "react-icons/fa6";
import { useTheme } from "next-themes";

type props = {
  models: string[];
};

export const TTSDemo = ({ models }: props) => {
  const {
    text,
    setText,
    sendText,
    loading,
    isPlaying,
    model,
    setModel,
    currentTime,
    totalDuration,
    requested,
    seekTo,
  } = useTTSStore();

  const progress = totalDuration
    ? Math.round(Math.min((currentTime / totalDuration) * 100, 100))
    : 0;

  useEffect(() => {
    if (models.length) setModel(models[0]);
  }, [models]);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 200) setText(event.target.value);
  };
  const t = useTranslations("main");

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    if (!totalDuration) return;
    const latency = 0.01;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const pct = clickX / rect.width;
    const targetSec = (pct - latency) * totalDuration;
    seekTo(targetSec);
  };

  const { resolvedTheme } = useTheme();

  return (
    <div className="w-full border-zinc-200 dark:border-zinc-800 dark:bg-black/80 bg-white/95 shadow-sm border-[1px] px-5 rounded-2xl">
      <textarea
        value={text}
        onChange={handleChange}
        className="h-[168px] lg:text-xl sm:text-sm text-xs dark:bg-black/20 bg-white/5 resize-none px-0 py-4 w-full  border-none outline-none"
      ></textarea>
      <div
        onClick={handleSeek}
        className="w-full h-[4px] bg-zinc-200 dark:bg-zinc-800 rounded-full duration relative cursor-pointer"
      >
        <div
          style={{ width: `${progress}%` }}
          className={`absolute rounded-full transition-[width] duration-200 ease-linear dark:bg-white bg-black h-[4px]`}
        ></div>
      </div>
      <div className="py-4 flex justify-between items-center">
        <Select onValueChange={setModel} value={model}>
          <SelectTrigger className="md:w-[180px] w-[100px] rounded-full dark:border-zinc-900">
            <SelectValue placeholder={t("models")} />
          </SelectTrigger>
          <SelectContent className="dark:bg-black dark:border-zinc-900 bg-white">
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-light text-xs md:text-md">
            {text.length} / 200
          </span>
          <div
            onClick={sendText}
            className={`md:w-[36px] md:h-[36px] w-[28px] h-[28px] rounded-full transition-all  ${
              !Boolean(model)
                ? "bg-neutral-500 dark:bg-neutral-500"
                : requested
                ? "bg-cyan-700 dark:bg-cyan-200"
                : ""
            } bg-black dark:bg-white flex justify-center items-center cursor-pointer`}
          >
            {loading ? (
              <ClipLoader
                size={20}
                color={resolvedTheme === theme.dark ? "black" : "white"}
              />
            ) : isPlaying ? (
              <FaPause className="text-white dark:text-black  text-xs md:text-md" />
            ) : (
              <FaPlay className="text-white dark:text-black ml-1 text-xs md:text-md" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
