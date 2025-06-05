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
        <img
          src={Icons?.HowItWorks}
          alt="how it works"
          className="h-[600px]"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
