import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { PricingExplanation } from "@/view/pricing/explanation";
import { Fragment } from "react";

const ExplanationPage = () => {
  return (
    <Fragment>
      <Header />
      <PricingExplanation />
      <Footer />
    </Fragment>
  );
};

export default ExplanationPage;
