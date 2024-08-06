import { Button } from "@/z_shared/ui/Buttons";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import FullPageScroll from "@/providers/fullpage-provider";
import { Fragment } from "react";
import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";
export const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <FullPageScroll>
        <div className="section active min-h-screen flex justify-center items-center">
          <div className="flex flex-col items-center w-6/12">
            <h1 className="text-5xl text-center leading-[110%]">
              The most powerful platform for building AI products
            </h1>
            <p className="text-xl w-9/12 text-center pt-[36px]">
              Build and scale AI experiences powered by industry-leading models
              and tools.
            </p>
            <div className="flex justify-center gap-2 pt-[36px]">
              <Button className="dark:bg-white dark:text-neutral-950 rounded-3xl flex justify-center items-center gap-2">
                <span>Start bulding</span> <CiLocationArrow1 />
              </Button>
              <Button variant="link">
                <span>View API Pricing </span>
                <IoIosArrowForward />
              </Button>
            </div>
          </div>
        </div>
        <div className="section min-h-screen flex justify-center items-center ">
          <div className="container">
            <h2 className="text-5xl text-center leading-[110%]">Voice AI</h2>

            <div className="flex gap-8 justify-between pt-10">
              <div className="bg-neutral-900 p-8 py-12 flex flex-col items-start rounded-lg gap-5 m:px-s gap-xs flex-1">
                <h2 className="text-2xl">Text To Speech</h2>
                <p>
                  Transform written text into natural-sounding speech with our
                  advanced Text-to-Speech technology. Perfect for creating
                  audiobooks, voiceovers, and more.
                </p>
                <ul className="flex flex-col gap-4 pt-3">
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>High-quality, human-like voices</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>Multiple languages and accents</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>Real-time audio streaming</span>
                  </li>
                </ul>
                <Button className="dark:bg-white dark:text-neutral-950 mt-5 rounded-3xl flex justify-center items-center gap-2">
                  <span>Learn more</span>
                </Button>
              </div>
              <div className="bg-neutral-900 p-8 py-12 flex flex-col items-start rounded-lg gap-5 m:px-s gap-xs flex-1">
                <h2 className="text-2xl">Speech To Text</h2>
                <p>
                  Convert spoken language into written text with our
                  cutting-edge Speech-to-Text service. Ideal for transcriptions,
                  voice commands, and more.
                </p>
                <ul className="flex flex-col gap-4 pt-3">
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>Accurate and fast transcription</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>Supports various audio formats</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <CiCircleCheck />
                    <span>Integrates with multiple platforms</span>
                  </li>
                </ul>
                <Button className="dark:bg-white dark:text-neutral-950 mt-5 rounded-3xl flex justify-center items-center gap-2">
                  <span>Learn more</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="section min-h-screen flex justify-center items-center ">
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
        </div>
      </FullPageScroll>
      <Footer />
    </Fragment>
  );
};
