import { useTranslations } from "next-intl";
import { ContactForm } from "./form";

export const ContactPage = () => {
  const t = useTranslations("contact");
  return (
    <div className="min-h-screen flex flex-col pt-[168px] items-center">
      <div className="w-6/12">
        <h2 className="text-5xl text-center">{t("title")}</h2>
        <p className="text-neutral-400 text-sm text-center pt-5">{t("desc")}</p>
      </div>
      <div className="w-1/3 pt-6">
        <ContactForm />
      </div>
    </div>
  );
};
