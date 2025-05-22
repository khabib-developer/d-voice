"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/z_shared/ui/Navigation";
import { Logo } from "@/z_shared/icons";
import { Routes } from "@/z_shared/constants";
import { useLinkHook } from "@/z_shared/hooks/link.hook";
import { Button } from "@/z_shared/ui/Buttons";
import { useLocale, useTranslations } from "next-intl";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { RxHamburgerMenu } from "react-icons/rx";
export function Header() {
  const { passiveLink } = useLinkHook();
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <div className="w-full fixed z-50 backdrop-blur-md shadow-lg dark:shadow-zinc-900">
      <div className="container flex justify-between h-[60px] items-center">
        <Link
          href={Routes.home}
          className="h-fit flex flex-1 items-center gap-2"
        >
          <Logo />
          <span className="text-lg font-bold font-quicksand">DVoice</span>
        </Link>
        <NavigationMenu className="flex-[4] hidden md:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href={Routes.home} legacyBehavior passHref>
                <NavigationMenuLink className={passiveLink(Routes.home, true)}>
                  {t("home")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <a
                href={`${process.env
                  .NEXT_PUBLIC_DOCS_DVOICE!}${locale}/docs/1-index`}
                target="_blank"
              >
                {t("documentation")}
              </a>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.pricing} legacyBehavior passHref>
                <NavigationMenuLink className={passiveLink(Routes.pricing)}>
                  {t("pricing")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.contact} legacyBehavior passHref>
                <NavigationMenuLink className={passiveLink(Routes.contact)}>
                  {t("contact")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-end flex-1 items-center gap-2">
          <Button
            onClick={navigateToProfileDvoice}
            className="rounded-3xl text-xs !h-7 bg-black hidden md:flex text-white dark:bg-white dark:text-black"
          >
            {t("app")}
          </Button>
          <RxHamburgerMenu className="text-xl md:hidden" />
        </div>
      </div>
    </div>
  );
}
