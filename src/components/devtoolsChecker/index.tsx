"use client";

import { useDevToolsStatus } from "@/hooks/devtools.hook";
import { useEffect } from "react";

export const DevToolsChecker = () => {
  const open = useDevToolsStatus();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    // window.location.reload();
  }, [open]);

  if (open)
    return (
      <div className="bg-black absolute top-0 left-0 w-full h-screen z-50 flex justify-center items-center text-3xl font-mono">
        Please close developer tools to use this page, otherwise your window
        will be reloaded
      </div>
    );
};
