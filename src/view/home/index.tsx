import { Button } from "@/z_shared/ui/Buttons";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import FullPageScroll from "@/providers/fullpage-provider";
import { Fragment } from "react";
import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";
import { Example } from "./example";
import { UseCases } from "./use_cases";
import { ApiSection } from "./api";
import { Sdk } from "./sdk";
import { FAQs } from "./questions";
import { BonusCTA } from "./bonus";

type props = {
  models: string[];
};

export const HomePage = (props: props) => {
  return (
    <Fragment>
      <Header />
      <div className="">
        <Example models={props.models} />
        <UseCases />
        <ApiSection />
        <Sdk />
        <FAQs />
        <BonusCTA />
      </div>
      <Footer />
    </Fragment>
  );
};
