import { TTSDemo } from "@/components/tts-demo";
import { Button } from "@/z_shared/ui/Buttons";
import { useTranslations } from "next-intl";
import { GrFormNext } from "react-icons/gr";
import { BackgroundAnimation } from "./animation";
import { navigateToProfileDvoice } from "@/z_shared/utils";
import { LimitModal } from "@/components/limitModal";

type props = {
  models: string[];
};

export const Example = (props: props) => {
  const t = useTranslations("main");
  return (
    <div className="mx-auto section active min-h-screen flex flex-col justify-center items-center">
      <div className="lg:w-[900px] md:w-[92%] w-[88%]">
        <h1 className="text-xl sm:text-4xl lg:text-7xl font-bold font-merriweather">
          {t("hero-text")}
        </h1>
        <p className="lg:text-2xl sm:text-md text-sm mt-5 px-1">
          {t("hero-desc")}
        </p>
        <Button
          onClick={navigateToProfileDvoice}
          className="mt-5 overflow-hidden bg-[#F9DF74] flex gap-1 !text-black md:text-md text-xs lg:text-xl px-16 lg:py-5 py-2 w-full sm:w-auto rounded-2xl get-started relative"
        >
          {t("start")}
          <GrFormNext />
        </Button>
      </div>
      <div className="relative w-full mt-12">
        <BackgroundAnimation />
        <div className="lg:w-[900px] w-[88%] mx-auto">
          <TTSDemo models={props.models} />
        </div>
      </div>
      <LimitModal />
    </div>
  );
};
