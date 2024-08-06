"use client";
import { Routes } from "@/z_shared/constants";
import { Button } from "@/z_shared/ui/Buttons";
import { useRouter } from "next/navigation";

export const PricingPage = () => {
  const router = useRouter();
  const handleClick = () => router.push(Routes.contact);
  return (
    <div className="flex justify-center ">
      <div className="w-6/12 mt-[168px]">
        <h2 className="text-6xl text-center">Pricing</h2>
        <p className=" text-center text-2xl pt-5">Currently it is free</p>
        <Button
          onClick={handleClick}
          className="dark:bg-white m-auto mt-12 dark:text-neutral-950 rounded-3xl flex justify-center items-center gap-2"
        >
          Contact sales
        </Button>
      </div>
      <div></div>
    </div>
  );
};
