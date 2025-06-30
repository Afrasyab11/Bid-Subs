import { Icons } from "@/assets/Index";
import MainHeading from "@/common/MainHeading";
const HowItWorks = () => {
  return (
    <div className="">
      <MainHeading
        heading="How it works"
        subheading="Everything you need to win more jobs"
      />
      <div className="py-10 flex items-center justify-center">
        {/* <Image
         src={theme === "light" ? Icons?.howWorksLight : Icons?.howItworkBg}

          alt="how it works"

        /> */}
        <img
          src={Icons.howWorksLight}
          alt="how it works"
          className="block dark:hidden h-auto w-auto"
        />

        <img
          src={Icons.howItworkBg}
          alt="how it works"
          className="hidden dark:block h-auto w-auto"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
