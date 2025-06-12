import { Icons } from "@/assets/Index";
import Image from "@/common/image/Image";
import MainHeading from "@/common/MainHeading";
import { useSession } from "@/sessionManager/SessionContext";
const HowItWorks = () => {
  const {theme}=useSession()
  return (
    <div className="">
      <MainHeading
        heading="How it works"
        subheading="Everything you need to win more jobs"
      />
      <div className="py-10 flex items-center justify-center">
        <Image
         src={theme === "light" ? Icons?.howWorksLight : Icons?.howItworkBg}
          // src={Icons?.howItworkBg}
          alt="how it works"
          // className="h-[600px]"
        />
      </div>
    </div>
  );
};

export default HowItWorks;
