import { Button } from "@/z_shared/ui/Buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/z_shared/ui/ui/card";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { useTranslations } from "next-intl";
import { CiCircleCheck } from "react-icons/ci";
import { MdVpnKey } from "react-icons/md";
export const ApiSection = () => {
  const t = useTranslations("main");
  return (
    <div className="section container flex flex-col justify-center pt-48">
      <h2 className="text-5xl text-center leading-[110%]">{t("dvoice-api")}</h2>
      <p className="text-center pt-8 text-xl">{t("dvoice-api-desc")}</p>
      <div className="flex gap-12 pt-12">
        <Card className="dark:border-slate-950 border-indigo-50 flex-1 bg-indigo-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              {t("single")}
            </CardTitle>
            <CardDescription>{t("single-short-desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t("single-desc")}</p>
            <h4 className="pt-4 font-bold">{t("best")}</h4>
            <ul className="flex flex-col gap-4 pt-3">
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("single-1")}</span>
              </li>
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("single-2")}</span>
              </li>
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("single-3")}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={navigateToProfileDvoice}
              className="bg-black text-white dark:bg-white dark:text-black rounded-full px-8 flex items-center gap-2"
            >
              {t("button-api")}
              <MdVpnKey />
            </Button>
          </CardFooter>
        </Card>
        <Card className="dark:border-slate-950 border-indigo-50 flex-1 bg-indigo-50 dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              {t("stream")}
            </CardTitle>
            <CardDescription>{t("streaming-short-desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t("streaming-desc")}</p>
            <h4 className="pt-4 font-bold">{t("best")}</h4>
            <ul className="flex flex-col gap-4 pt-3">
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("streaming-1")}</span>
              </li>
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("streaming-2")}</span>
              </li>
              <li className="flex gap-3 items-center">
                <CiCircleCheck />
                <span>{t("streaming-3")}</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={navigateToProfileDvoice}
              className="bg-black text-white dark:bg-white dark:text-black rounded-full px-8 flex items-center gap-2"
            >
              {t("button-api")}
              <MdVpnKey />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
