import { Button } from "@/z_shared/ui/Buttons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/z_shared/ui/HoverCard";
import Link from "next/link";
import { IoLanguage } from "react-icons/io5";

export const LanguageMenu = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="px-0">
          <div className="flex items-center text-gray-400 gap-2">
            <IoLanguage />
            <span className="pl-2">Language</span>
          </div>
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
  );
};
