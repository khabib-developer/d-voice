import { LanguageMenu } from "@/components/languageMenu";
import { ThemeSwitcher } from "@/components/theme";
import { Routes } from "@/z_shared/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <div className="w-full fixed z-50 bottom-0 backdrop-blur-md h-[100px] -mb-[50px]">
      <div className="container h-[50px] justify-between border-t-[1px] dark:border-zinc-800 text-sm flex items-center">
        <div className="flex items-center flex-col md:flex-row">
          <div>
            <span>©</span>
            <span>{new Date().getFullYear()}</span>{" "}
            <span className="font-bold font-quicksand">DVoice, Inc</span>
          </div>

          <Link
            href={Routes.terms}
            className="mx-3 hidden md:inline text-zinc-600 font-sans hover:text-black text-xs md:text-md  dark:text-zinc-300 dark:hover:text-white"
          >
            {t("terms")}
          </Link>
          <Link
            href={Routes.privacy}
            className=" text-zinc-600 hidden md:inline font-sans hover:text-black text-xs md:text-md  dark:text-zinc-300 dark:hover:text-white"
          >
            {t("privacy")}
          </Link>
        </div>
        <div className="flex gap-2 items-center ">
          <div className="md:block hidden">
            <LanguageMenu />
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
