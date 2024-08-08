"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/z_shared/ui/Navigation";
import { Logo } from "@/z_shared/icons";
import { AiOutlineLogin } from "react-icons/ai";
import { Routes } from "@/z_shared/constants";
import { LanguageMenu } from "@/components/languageMenu";
import { useLinkHook } from "@/z_shared/hooks/link.hook";

export function Header() {
  const { passiveLink } = useLinkHook();

  return (
    <div className="w-full fixed z-50 header">
      <div className="container flex justify-between h-[60px] items-center">
        <Link href={Routes.home} className="h-fit">
          <Logo />
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href={Routes.home} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${passiveLink(
                    Routes.home,
                    true
                  )} `}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.docs} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${passiveLink(
                    Routes.docs
                  )} `}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.pricing} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${passiveLink(
                    Routes.pricing
                  )} `}
                >
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.contact} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${passiveLink(
                    Routes.contact
                  )} `}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LanguageMenu />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <AiOutlineLogin className="w-[22px] h-[22px]" />
        </div>
      </div>
    </div>
  );
}
