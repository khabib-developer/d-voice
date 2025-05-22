import { IAppStore } from "@/z_shared/types";
import { create } from "zustand";

export const useAppStore = create<IAppStore>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    set({ isMobileMenuOpen: open });
  },
}));
