"use client";
import { Button } from "@/z_shared/ui/Buttons";
import { useTheme } from "next-themes";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { theme } from "@/z_shared/constants";
import { useEffect, useState } from "react";
export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const changeTheme = resolvedTheme === theme.dark ? theme.light : theme.dark;
  const [mounted, setMounted] = useState(false);

  // When mounted on client, we can safely read resolvedTheme
  useEffect(() => {
    setMounted(true);
  }, []);

  // While SSR or initial client render, don’t show anything
  if (!mounted) return null;
  const icon =
    resolvedTheme === theme.dark ? (
      <MdOutlineLightMode className="text-lg" />
    ) : (
      <CiDark className="text-lg" />
    );
  return (
    <Button size="icon" onClick={() => setTheme(changeTheme)}>
      {icon}
    </Button>
  );
};
