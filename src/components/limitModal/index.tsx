"use client";
import { useTTSStore } from "@/store/tts.store";
import { Button } from "@/z_shared/ui/Buttons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/z_shared/ui/ui/dialog";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { useTranslations } from "next-intl";

export function LimitModal() {
  const { limit, setLimit } = useTTSStore();
  const t = useTranslations("limit");

  return (
    <Dialog open={limit} onOpenChange={setLimit}>
      <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("title")}</DialogTitle>
          <DialogDescription className="text-md mt-2">
            {t("desc")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="w-full mt-4 bg-black text-white dark:bg-white dark:text-black rounded-full"
            onClick={navigateToProfileDvoice}
          >
            {t("login")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
