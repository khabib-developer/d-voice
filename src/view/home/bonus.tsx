import { navigateToProfileDvoice } from "@/z_shared/utils";
import { useTranslations } from "next-intl";

export const BonusCTA = () => {
  const t = useTranslations("main");
  return (
    <section className="bg-indigo-50 text-black dark:bg-slate-950 dark:text-white py-20 px-6 text-center rounded-t-[70px] mt-40">
      <div className="max-w-3xl mx-auto">
        <h2 className="md:text-4xl sm:text-3xl text-xl font-semibold mb-4">
          {t("bonus-title")}
        </h2>
        <p className="md:text-lg sm:text-md text-xs text-gray-800 dark:text-gray-200 mb-6">
          {t("bonus-desc")}
        </p>
        <div className="flex gap-2 justify-center items-center">
          <a
            onClick={navigateToProfileDvoice}
            className="cursor-pointer bg-black text-white dark:bg-white dark:text-black font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {t("create")}
          </a>
        </div>
      </div>
    </section>
  );
};
