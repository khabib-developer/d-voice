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
import { IoLanguage } from "react-icons/io5";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/z_shared/ui/HoverCard";
import { Button } from "@/z_shared/ui/Buttons";
import { AiOutlineLogin } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Routes } from "@/z_shared/constants";

export function Header() {
  const pathname = usePathname();
  const passiveLink = (route: string) => route !== pathname;
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
                  className={`${navigationMenuTriggerStyle()} ${
                    passiveLink(Routes.home) && "text-neutral-400"
                  } `}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.docs} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    passiveLink(Routes.docs) && "text-neutral-400"
                  } `}
                >
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.pricing} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    passiveLink(Routes.pricing) && "text-neutral-400"
                  } `}
                >
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={Routes.contact} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${
                    passiveLink(Routes.contact) && "text-neutral-400"
                  } `}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button className="px-0">
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-neutral-400`}
                    >
                      <IoLanguage />
                      <span className="pl-2">Language</span>
                    </NavigationMenuLink>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="">
                  <ul className="[&>li]:mt-2 list-none">
                    <li className="text-gray-400">
                      <Link href="/" className="">
                        Uzbek
                      </Link>
                    </li>
                    <li className="text-gray-400">
                      <Link href="/">Russian</Link>
                    </li>
                    <li>
                      <Link href="/">English</Link>
                    </li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
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
