import MainHeading from "@/common/MainHeading";

export const BuiltForBuilders = () => {
  return (
    <div className="pt-14 flex flex-col items-center justify-center gap-6 text-white">
      <div>
        <MainHeading
          heading="Built for Builders, Powered by AI"
          classname="text-center"
        />
        <MainHeading
          subheading="Catch costly errors before they 
happen"
          classname="text-center"
        />
      </div>

      <p className="text-center max-w-1/2 max-sm:w-full sm:text-justify md:text-center text-gray dark:text-white w-full max-w-4xl sm:px-2 md:p-0">
        Our AI-powered platform checks the fine print so you don’t have to—
        reducing risk, increasing accuracy, and saving you time.
      </p>
    </div>
  );
};
