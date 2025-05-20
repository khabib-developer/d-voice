import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/z_shared/ui/Accordion";
import { useTranslations } from "next-intl";

export const FAQs = () => {
  const t = useTranslations("main");
  return (
    <section className="container flex flex-col justify-center pt-48">
      <h2 className="text-5xl text-center leading-[110%] mb-14">{t("faq")}</h2>
      <Accordion type="multiple">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((index) => (
          <AccordionItem
            value={"item-" + index}
            className="pb-3 dark:!border-zinc-800"
          >
            <AccordionTrigger className="text-2xl font-bold ">
              {t("q-" + index)}
            </AccordionTrigger>
            <AccordionContent className="text-xl">
              {t("a-" + index)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
