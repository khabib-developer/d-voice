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

        {/* <div className="section min-h-screen flex justify-center items-center ">
          <div className="container flex flex-col items-center">
            <h2 className="text-5xl text-center leading-[110%]">
              See what you can build in Playground
            </h2>
            <p className="pt-3 w-8/12 text-center">
              Explore our models and APIs in Playground without writing a single
              line of code.
            </p>
            <Button className="dark:bg-white dark:text-neutral-950 mt-5 rounded-3xl flex justify-center items-center gap-2">
              <span>Start exploring</span>
            </Button>
          </div>
        </div> */}
      </div>
      <Footer />
    </Fragment>
  );
};
