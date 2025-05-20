import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/z_shared/ui/ui/card";
import { useTranslations } from "next-intl";
import { ImHeadphones } from "react-icons/im";
import { GiBookshelf } from "react-icons/gi";
import { RiVoiceAiFill } from "react-icons/ri";
import { BsRobot } from "react-icons/bs";
export const UseCases = () => {
  const t = useTranslations("main");
  return (
    <div className="section container flex flex-col justify-center">
      <h2 className="text-5xl text-center leading-[110%]">{t("use cases")}</h2>
      <div className="flex gap-6 pt-28">
        <Card className="dark:border-zinc-700 flex-1">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              <ImHeadphones />
              {t("accessiblity")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("accessiblity-desc")}</p>
          </CardContent>
        </Card>
        <Card className="dark:border-zinc-700 flex-1">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              <GiBookshelf />
              {t("education")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("education-desc")}</p>
          </CardContent>
        </Card>
        <Card className="dark:border-zinc-700 flex-1">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              <RiVoiceAiFill />
              {t("voiceover")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("voiceover-desc")}</p>
          </CardContent>
        </Card>
        <Card className="dark:border-zinc-700 flex-1">
          <CardHeader>
            <CardTitle className="text-xl flex gap-2 items-center">
              <BsRobot />
              {t("chatbot")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("chatbot-desc")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
