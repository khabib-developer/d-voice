import { Routes } from "@/z_shared/constants";
import { Input } from "@/z_shared/ui/Input";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
export const DocsHeader = () => {
  return (
    <div className="w-full fixed z-50 header">
      <div className="px-12 flex justify-between h-[50px] items-center">
        <div className="flex gap-4">
          <Link href={Routes.home} className="text-neutral-400 font-bold">
            {" "}
            DVoice
          </Link>
          <Link href={Routes.home} className="font-bold">
            {" "}
            Documentation
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <Link href={Routes.contact} className="text-neutral-400">
            {" "}
            Contact
          </Link>
          <div className="relative">
            <Input
              placeholder="Search documentation..."
              className="w-[256px] bg-neutral-700 !border-0  h-[30px]"
            />
            <div className="absolute top-[7px] right-[7px]">
              <CiSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
