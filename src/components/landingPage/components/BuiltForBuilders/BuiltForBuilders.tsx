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
          subheading="Reinventing the way subcontractors estimate and win"
          classname="text-center"
        />
      </div>

      <p className="text-center max-w-1/2 max-sm:w-full sm:text-justify md:text-center w-full max-w-4xl sm:px-2 md:p-0">
        At BidSubs, we’re reshaping how subcontractors bid. Born from real
        construction experience and powered by AI, our platform turns blueprints
        into accurate, ready-to-send proposals—fast. No more guesswork, no more
        manual takeoffs.
      </p>
    </div>
  );
};
