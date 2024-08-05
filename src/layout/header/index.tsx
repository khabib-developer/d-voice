"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/Navigation";
import { Logo } from "@/shared/icons";
import { IoLanguage } from "react-icons/io5";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/HoverCard";
import { Button } from "@/shared/ui/Buttons";
import { AiOutlineLogin } from "react-icons/ai";

export function Header() {
  return (
    <div className="flex container justify-between h-[60px] items-center">
      <div className="h-fit">
        <Logo />
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="px-0">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
