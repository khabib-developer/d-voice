"use client";
import { useState, useEffect } from "react";
import devtoolsDetect from "devtools-detect";
import { Routes } from "@/z_shared/constants";
import { useRouter } from "next/navigation";

export function useDevToolsStatus() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(devtoolsDetect.isOpen);

  useEffect(() => {
    const handleChange = (event: any) => {
      setIsDevToolsOpen(event.detail.isOpen);
    };

    window.addEventListener("devtoolschange", handleChange);

    return () => {
      window.removeEventListener("devtoolschange", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isDevToolsOpen) {
    }
  }, [isDevToolsOpen]);

  return isDevToolsOpen;
}
