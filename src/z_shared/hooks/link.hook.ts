import { usePathname } from "next/navigation";

export const useLinkHook = () => {
  const pathname = usePathname();
  const passiveLink = (route: string, equal: boolean = false) =>
    (equal ? pathname !== route : !pathname.includes(route)) ? "" : "font-bold";
  return { passiveLink };
};
