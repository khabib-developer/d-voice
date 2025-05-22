import { useTranslations } from "next-intl";
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
export const Sdk = () => {
  const t = useTranslations("main");
  return (
    <section className="py-24 px-4 text-center relative overflow-hidden mt-28 custom-radial-bg text-white">
      <div className="max-w-3xl mx-auto z-10 relative">
        <h2 className="md:text-3xl sm:text-2xl text-xl font-bold mb-4">
          {t("sdk")}
        </h2>
        <p className="md:text-lg text-sm mb-6">{t("sdk-desc")}</p>
        <p className="md:text-md text-xs mb-6 text-neutral-100">
          {t("sdk-part-1")}
          <code className="bg-white font-mono text-black px-1 md:px-2 md:py-1 py-0 rounded mx-2">
            dvoice-tts
          </code>
          {t("sdk-part-2")}
        </p>
        <div className="flex justify-center sm:flex-row items-center flex-col gap-4">
          <a
            href="https://www.npmjs.com/package/dvoice-tts"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 md:py-1 py-1 w-fit rounded-full shadow flex items-center gap-2"
          >
            <FaNodeJs />
            Node.js SDK
          </a>
          <a
            href="https://pypi.org/project/dvoice-tts"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:py-1 py-1 w-fit rounded-full shadow flex items-center gap-2"
          >
            <FaPython />
            Python SDK
          </a>
        </div>
      </div>
    </section>
  );
};
