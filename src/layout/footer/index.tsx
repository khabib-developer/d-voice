import { LanguageMenu } from "@/components/languageMenu";
import { ThemeSwitcher } from "@/components/theme";
import { Routes } from "@/z_shared/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <div className="w-full fixed z-50 bottom-0 backdrop-blur-md ">
      <div className="container h-[50px] justify-between border-t-[1px] dark:border-zinc-800 text-sm flex items-center">
        <div>
          <span>©</span>
          <span>{new Date().getFullYear()}</span>{" "}
          <span className="font-bold font-quicksand">DVoice, Inc</span>
          <Link
            href={Routes.terms}
            className="mx-3 text-zinc-600 font-sans hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {t("terms")}
          </Link>
          <Link
            href={Routes.privacy}
            className=" text-zinc-600 font-sans hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {t("privacy")}
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <LanguageMenu />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
