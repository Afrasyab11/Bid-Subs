import React from "react";
import Image from "@/common/image/Image";
import { Icons } from "@/assets/Index";
import Button from "@/common/Button";
import { useSession } from "@/sessionManager/SessionContext";
export const AiDriven: React.FC = () => {
  const { theme } = useSession();
  const features = [
    {
      title: "Automatic Takeoff:",
      description: "Scans drawings and extracts quantities instantly.",
    },
    {
      title: "Dynamic Pricing:",
      description: "Pulls up-to-date supplier costs to keep bids competitive.",
    },
    {
      title: "Bid Templates:",
      description: "Generates organized proposals ready to send to clients.",
    },
    {
      title: "Collaboration:",
      description:
        "Easy sharing with team members and clients (e.g. PDF export, cloud storage).",
    },
  ];

  return (
    <div className="pl-0 md:pl-12 lg:pl-20 grid grid-cols-1 lg:grid-cols-2 gap-8 text-semi-dark dark:text-white w-full">
      <div className="space-y-8 pt-0 xl:pt-10">
        <div>
          <h1 className="text-2xl lg:text-5xl  mb-4">
            AI-Driven Estimating,
            <br />
            Start to Finish
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            From Plans to Proposal in Minutes.
          </p>
        </div>

        {features?.map((item: any) => (
          <div className="flex items-center gap-x-3 text-semi-dark dark:text-white">
            <Image
              src={Icons?.AiDrivenArrow}
              alt="Ai Driven Arrow Icons"
              className="h-7 w-7"
            />
            <div className="flex gap-x-1 w-full max-w-sm">
              <span>
                {" "}
                <strong>{item?.title}</strong> {item?.description}
              </span>
            </div>
          </div>
        ))}
        <Button
          label="Try it Now - Free Demo"
          className="!bg-blue text-white dark:!text-white rounded-full !px-3 py-3 gap-x-2 max-w-[276px]"
        >
          {" "}
          <Image src={Icons?.tryNow} alt="Try now" className="h-6 w-6" />
        </Button>
      </div>

      <div>
        <Image
          src={theme === "light" ? Icons?.aiDrivenLight : Icons?.AiDriven}
          alt="AI Driven"
          className="max-h-[716px] w-full "
        />
      </div>
    </div>
  );
};
