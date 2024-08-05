import { Button } from "@/shared/ui/Buttons";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
export const HomePage = () => {
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center">
      <div className="flex flex-col items-center w-6/12">
        <h1 className="text-5xl text-center leading-[110%]">
          The most powerful platform for building AI products
        </h1>
        <p className="text-xl w-9/12 text-center pt-[36px]">
          Build and scale AI experiences powered by industry-leading models and
          tools.
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
  );
};
