import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { PricingPage } from "@/view/pricing";
import { Fragment } from "react";

const Pricing = () => {
  return (
    <Fragment>
      <Header />
      <PricingPage />
      <Footer />
    </Fragment>
  );
};

export default Pricing;
