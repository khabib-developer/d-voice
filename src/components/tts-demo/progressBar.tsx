import { useTTSStore } from "@/store/tts.store";

export const ProgressBar = () => {
  const { downloaded, progress } = useTTSStore();
  return (
    <div
      // onClick={handleSeek}
      className="w-full h-[4px] bg-zinc-200 dark:bg-zinc-800 rounded-full duration relative cursor-pointer"
    >
      <div
        style={{ width: `${progress}%` }}
        className={`absolute rounded-full transition-[width] duration-200 z-[1] ease-linear dark:bg-white bg-black h-[4px]`}
      ></div>
      <div
        style={{ width: `${downloaded}%` }}
        className={`absolute rounded-full transition-[width] duration-200 ease-linear dark:bg-zinc-600 bg-zinc-400 h-[4px]`}
      ></div>
    </div>
  );
};
