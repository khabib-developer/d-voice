"use client";

import { language } from "@/z_shared/constants";
import { useEffect, useState } from "react";
import { setUserLocale } from "@/i18n/service";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/z_shared/ui/toggle-group";
export const LanguageMenu = () => {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  // When mounted on client, we can safely read resolvedTheme
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <ToggleGroup onSelect={(e) => console.log(e)} type="single" size="sm">
      {Object.keys(language).map((l) => (
        <ToggleGroupItem
          className={`${locale === l ? "dark:bg-zinc-800 bg-zinc-300" : ""}`}
          key={l}
          value={l}
          onClick={() => setUserLocale(l as Locale)}
        >
          {l}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
