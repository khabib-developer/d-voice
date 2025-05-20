import { Routes } from "@/z_shared/constants";
import { useTranslations } from "next-intl";
import { IoMdArrowRoundBack } from "react-icons/io";

export const PricingExplanation = () => {
  const t = useTranslations("explanation");
  console.log(t);
  return (
    <div className="container py-[108px] prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        {t("title")}
      </h1>

      {Array.from({ length: 6 }, (_, i) => i + 1).map((index) => (
        <p key={index} className="text-zinc-600 dark:text-zinc-400 mb-4">
          {t.rich("section-" + index, {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      ))}

      <div className="mt-4 text-end flex justify-end">
        <a
          href={Routes.pricing}
          className="text-blue-600 hover:underline font-medium text-lg flex items-center gap-2"
        >
          <IoMdArrowRoundBack />
          {t("pricing_link")}
        </a>
      </div>
    </div>
  );
};
