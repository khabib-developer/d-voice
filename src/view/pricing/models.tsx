import { ModelNames } from "@/z_shared/types";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type props = {
  models: ModelNames[];
};

export const Models = (props: props) => {
  const t = useTranslations("pricing");
  return (
    <Fragment>
      <h2 className="text-2xl font-bold mb-4">{t("model_pricing")}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-zinc-200 dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="p-3">Model</th>
              <th className="p-3">TTS (dcoin/ch)</th>
              <th className="p-3">TTS Stream (dcoin/ch)</th>
            </tr>
          </thead>
          <tbody>
            {props.models.map((model) => (
              <tr
                key={model.name}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="p-3">{model.name}</td>
                <td className="p-3">{model.single_price}</td>
                <td className="p-3">{model.stream_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
