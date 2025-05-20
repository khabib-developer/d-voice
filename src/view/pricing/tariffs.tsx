import { Tariff } from "@/z_shared/types";
import { Button } from "@/z_shared/ui/Buttons";
import { Card, CardContent, CardFooter } from "@/z_shared/ui/ui/card";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { useTranslations } from "next-intl";

type props = {
  tariffs: Tariff[];
};

export const Tariffs = (props: props) => {
  const t = useTranslations("pricing");
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {props.tariffs.map((tariff) => (
        <Card key={tariff.id} className="dark:border-zinc-600">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Start</h2>
            <p className="text-zinc-500 dark:text-white mb-4">
              <span className="text-xl font-bold">{tariff.price}</span> uzs /
              {t("month")}
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                <span className="text-xl">{tariff.dcoin}</span> dcoin
              </li>
              <li className=" flex gap-2 items-center">
                <span className="text-rose-500 text-lg ">
                  {tariff.disposal}%
                </span>{" "}
                <span className="italic text-xs">{t("discount")}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={navigateToProfileDvoice}
              size="sm"
              className="dark:bg-white dark:text-black bg-black text-white w-full rounded-full"
            >
              {t("get_started")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
