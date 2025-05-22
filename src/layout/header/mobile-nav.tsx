"use client";
import { useAppStore } from "@/store/app.store";
import { Routes } from "@/z_shared/constants";
import { Button } from "@/z_shared/ui/Buttons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/z_shared/ui/Navigation";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const MobileNav = () => {
  const t = useTranslations("header");
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const locale = useLocale();
  const pathname = usePathname();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  return (
    <div
      className={`container bg-white transition-all dark:bg-black fixed top-0 ${
        isMobileMenuOpen ? "opacity-100  z-10" : "opacity-0 -z-10"
      } backdrop-blur-md shadow-lg dark:shadow-zinc-900`}
    >
      <div className="justify-between h-[60px] items-center flex"></div>
      <div className="h-[calc(100vh-60px)]">
        <NavigationMenu className="pt-4 h-[calc(100vh-110px)] text-xl font-merriweather flex flex-col items-start justify-between">
          <NavigationMenuList className="gap-6 items-start flex-col">
            <NavigationMenuItem>
              <Link href={Routes.home} legacyBehavior passHref>
                <NavigationMenuLink>{t("home")}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="!mx-0">
              <a
                href={`${process.env
                  .NEXT_PUBLIC_DOCS_DVOICE!}${locale}/docs/1-index`}
                target="_blank"
              >
                {t("documentation")}
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem className="!mx-0">
              <Link href={Routes.pricing} legacyBehavior passHref>
                <NavigationMenuLink>{t("pricing")}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="!mx-0">
              <Link href={Routes.contact} legacyBehavior passHref>
                <NavigationMenuLink>{t("contact")}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="!mx-0">
              <Link href={Routes.terms} legacyBehavior passHref>
                <NavigationMenuLink>{t("terms")}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="!mx-0">
              <Link href={Routes.privacy} legacyBehavior passHref>
                <NavigationMenuLink>{t("privacy")}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <Button
            onClick={navigateToProfileDvoice}
            className="rounded-3xl bg-black text-white dark:bg-white dark:text-black mb-8"
          >
            {t("app")}
          </Button>
        </NavigationMenu>
      </div>
    </div>
  );
};
