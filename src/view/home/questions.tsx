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
      <h2 className="md:text-5xl sm:text-3xl text-xl text-center leading-[110%] mb-14">
        {t("faq")}
      </h2>
      <Accordion type="multiple">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((index) => (
          <AccordionItem
            key={index}
            value={"item-" + index}
            className="pb-3 dark:!border-zinc-800"
          >
            <AccordionTrigger className="sm:text-lg text-md text-start md:text-2xl font-bold ">
              {t("q-" + index)}
            </AccordionTrigger>
            <AccordionContent className="md:text-xl text-sm">
              {t("a-" + index)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
