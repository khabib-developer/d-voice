import { useTranslations } from "next-intl";
import { ContactForm } from "./form";

export const ContactPage = () => {
  const t = useTranslations("contact");
  return (
    <div className="min-h-screen flex flex-col pt-[168px] items-center">
      <div className="md:w-6/12 w-4/5">
        <h2 className="md:text-5xl sm:text-3xl text-xl text-center">
          {t("title")}
        </h2>
        <p className="text-neutral-400 text-sm md:text-center text-start pt-5">
          {t("desc")}
        </p>
      </div>
      <div className="md:w-1/3 w-4/5 pt-6">
        <ContactForm />
      </div>
    </div>
  );
};
