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
      <h2 className="md:text-5xl sm:text-3xl text-xl text-center leading-[110%]">
        {t("dvoice-api")}
      </h2>
      <p className="md:text-center text-start pt-8 md:text-xl text-md">
        {t("dvoice-api-desc")}
      </p>
      <div className="flex gap-6 md:gap-12 pt-12 md:flex-row flex-col">
        <Card className="dark:border-slate-950 border-indigo-50 flex-1 bg-indigo-50 dark:bg-slate-900">
          <CardHeader className="md:p-6 p-4">
            <CardTitle className="text-xl flex gap-2 items-center">
              {t("single")}
            </CardTitle>
            <CardDescription>{t("single-short-desc")}</CardDescription>
          </CardHeader>
          <CardContent className="md:p-6 p-4 !pt-0 text-xs md:text-md">
            <p>{t("single-desc")}</p>
            <h4 className="md:pt-4 pt-2 font-bold">{t("best")}</h4>
            <ul className="flex flex-col gap-2 md:gap-4 pt-3">
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
          <CardFooter className="flex md:justify-end justify-start md:p-6 p-4 !pt-0">
            <Button
              onClick={navigateToProfileDvoice}
              className="bg-black text-white dark:bg-white dark:text-black rounded-full md:w-auto w-full md:text-md text-xs px-8 flex items-center gap-2"
            >
              {t("button-api")}
              <MdVpnKey />
            </Button>
          </CardFooter>
        </Card>
        <Card className="dark:border-slate-950 border-indigo-50 flex-1 bg-indigo-50 dark:bg-slate-900">
          <CardHeader className="md:p-6 p-4">
            <CardTitle className="text-xl flex gap-2 items-center">
              {t("stream")}
            </CardTitle>
            <CardDescription>{t("streaming-short-desc")}</CardDescription>
          </CardHeader>
          <CardContent className="md:p-6 p-4 !pt-0 text-xs md:text-md">
            <p>{t("streaming-desc")}</p>
            <h4 className="md:pt-4 pt-2 font-bold">{t("best")}</h4>
            <ul className="flex flex-col gap-2 md:gap-4 pt-3">
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
          <CardFooter className="flex md:justify-end justify-start md:p-6 p-4 !pt-0">
            <Button
              onClick={navigateToProfileDvoice}
              className="bg-black text-white dark:bg-white dark:text-black rounded-full md:w-auto w-full md:text-md text-xs px-8 flex items-center gap-2"
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
