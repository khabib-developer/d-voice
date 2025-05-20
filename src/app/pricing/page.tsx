import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { PricingPage } from "@/view/pricing";
import { server } from "@/z_shared/api";
import { ModelNames, Tariff } from "@/z_shared/types";
import { Fragment } from "react";

const Pricing = async () => {
  let models: ModelNames[] = [];
  let tariffs: Tariff[] = [];

  try {
    models = await server<ModelNames[]>("/tts/modelNames");
    tariffs = await server<Tariff[]>("/tariff");
  } catch (error) {
    console.log(error);
  }

  return (
    <Fragment>
      <Header />
      <PricingPage models={models} tariffs={tariffs} />
      <Footer />
    </Fragment>
  );
};

export default Pricing;
