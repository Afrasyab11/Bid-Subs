import MainHeading from "@/common/MainHeading";
import blue from "@/assets/LandingImages/PNGs/Group 175.png";
import dashboardImg from "@/assets/LandingImages/PNGs/Dashboard.png";
import HeroBg from "@/assets/LandingImages/PNGs/Group 59772.png";

import { ROUTES_ENUM } from "@/constants/routes.constant";
import { Link } from "react-router-dom";
import Image from "@/common/image/Image";
import { useSession } from "@/sessionManager/SessionContext";
import { Icons } from "@/assets/Index";
const Herocontent = {
  heading: "Supercharge estimating with AI– win more jobs in half the time",
  paragraph:
    "Bidsubs is an AI-Powered platform built for construction teams. Upload your plans and let our AI instantly verify bids against project documents—ensuring alignment with scopes, drawings, and RFPs before making award decisions.",
  bookDemo: "Book a Demo",
  startFreeTrail: "Start Your Free Trial",
};

const Hero = () => {
  const { theme } = useSession();
  return (
    <div className=" flex flex-col relative items-center pt-6 justify-center text-center px-4 ">
      <Image
        className="absolute w-full h-full left-0 top-0  z-0 opacity-40"
        src={theme === "light" ? Icons?.heroGradient : blue}
        alt="Bid Subs"
      />
      <Image
        className="absolute w-full h-full top-0 z-0 bg-black/5"
        src={theme === "light" ? Icons?.hero59772 : HeroBg}
        alt="BidSubs"
      />
      {theme === "light" && (
        <Image
          src={Icons?.heroDashboardVecotorLight}
          alt="Dashboard Preview"
          className="absolute w-full h-auto bottom-0   z-10"
        />
      )}
      <div className="w-full max-w-4xl z-10 mt-20">
        <MainHeading
          classname="text-center text-6xl "
          heading={Herocontent.heading}
        />
        <p className="text-secondary dark:text-white my-6 text-xl sm:text-[15px] md:text-base sm:text-justify md:text-center">
          {Herocontent.paragraph}
        </p>

        <div className="flex justify-center items-center gap-4 sm:flex-col md:flex-row">
          <Link
            to={ROUTES_ENUM.LOGIN}
            className="rounded-4xl bg-primary rounded-full py-3 text-white px-8"
          >
            {Herocontent.startFreeTrail}
          </Link>
          <Link
            to={ROUTES_ENUM.DASHBOARD}
            className="rounded-4xl bg-transparent border rounded-full py-3 border-blue  text-primary dark:text-white px-8"
          >
            {Herocontent.bookDemo}
          </Link>
        </div>
      </div>
      <div className="relative ">
        <Image
          src={theme === "light" ? Icons?.heroDashboardLight : dashboardImg}
          alt="Dashboard Preview"
          className="mt-16 h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[240px] z-50 overflow-hidden">
        <img
          src={theme === "light" ? Icons?.lightBlue : Icons.blueBlur}
          alt=""
          className="w-full h-full object-cover blur-[2px]"
        />
      </div>
    </div>
  );
};

export default Hero;
