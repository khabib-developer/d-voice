import { useTranslations } from "next-intl";

export const Terms = () => {
  const t = useTranslations("terms");
  return (
    <div className="w-full bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 pt-[108px]">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans mb-8">
          {t("title")}
        </h1>

        <div className="space-y-8 text-base leading-relaxed font-sans">
          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-1")}</h2>
            <p>{t("desc-1")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-2")}</h2>
            <p>{t("desc-2")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-3")}</h2>
            <p>{t("desc-3")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-4")}</h2>
            <p>
              {t("desc-4")}{" "}
              <a
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("title-4").slice(3)}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-5")}</h2>
            <p>{t("desc-5")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-6")}</h2>
            <p>{t("desc-6")}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">{t("title-7")}</h2>
            <p>
              {t("desc-7")}{" "}
              <a
                href="mailto:support@dvoice.uz"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@dvoice.uz
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
