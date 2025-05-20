"use client";
import { ModelNames, Tariff } from "@/z_shared/types";
import { Button } from "@/z_shared/ui/Buttons";
import { Card, CardContent, CardFooter } from "@/z_shared/ui/ui/card";
import { Tariffs } from "./tariffs";
import { Models } from "./models";
import { useTranslations } from "next-intl";

type props = {
  tariffs: Tariff[];
  models: ModelNames[];
};
export const PricingPage = (props: props) => {
  const t = useTranslations("pricing");
  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 pt-[108px]">
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          {t("desc-1")}{" "}
          <a
            href="/explanation"
            className="text-blue-600 hover:underline font-medium"
          >
            {t("link")}
          </a>{" "}
          {t("desc-2")}
        </p>

        <Tariffs tariffs={props.tariffs} />

        <Models models={props.models} />
      </div>
    </div>
  );
};
