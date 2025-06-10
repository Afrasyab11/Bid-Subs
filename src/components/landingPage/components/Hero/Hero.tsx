import MainHeading from "@/common/MainHeading";
import blue from "@/assets/LandingImages/PNGs/Group 175.png";
import dashboardImg from "@/assets/LandingImages/PNGs/Dashboard.png";
import HeroBg from "@/assets/LandingImages/PNGs/Group 59772.png";
import Vector from "@/assets/LandingImages/SVGs/Vector 1.svg";
import { ROUTES_ENUM } from "@/constants/routes.constant";
import { Link } from "react-router-dom";
const Herocontent = {
  heading:
    "Supercharge your estimates with AI – win more bids in half the time.",
  paragraph:
    "BidSubs is an AI-powered estimating platform built for subcontractors. Upload your plans and let our AI instantly quantify materials, apply real-time pricing, and generate a complete bid – all in seconds instead of days.",
  buttonOne: "Start Your Free Trial",
  buttonTwo: "Book a Demo",
};

const Hero = () => {
  return (
    <div className="flex flex-col relative items-center justify-center text-center px-4 ">
      <img className="absolute  top-0 left-0 z-0" src={blue} alt="" />
      <img className="absolute w-full top-0 z-0" src={HeroBg} alt="" />

      <div className="w-full max-w-3xl z-10 mt-20">
        <MainHeading
          classname="text-center text-6xl "
          heading={Herocontent.heading}
        />
        <p className="text-white my-6 text-xl sm:text-[15px] md:text-base sm:text-justify md:text-center">
          {Herocontent.paragraph}
        </p>

        <div className="flex justify-center items-center gap-4 sm:flex-col md:flex-row">
          <Link
            to={ROUTES_ENUM.LOGIN}
            className="rounded-4xl bg-blue rounded-full py-3 text-white px-8"
          >
            {Herocontent.buttonOne}
          </Link>
          <Link
            to={ROUTES_ENUM.DASHBOARD}
            className="rounded-4xl bg-transparent border rounded-full py-3 text-white px-8"
          >
            {Herocontent.buttonTwo}
          </Link>
        </div>
      </div>
      <div className="relative ">
        <img src={Vector} alt="" className="absolute w-full bottom-0 " />

        <img
          src={dashboardImg}
          alt="Dashboard Preview"
          width={900}
          height={700}
          className="mt-16"
        />
      </div>
    </div>
  );
};

export default Hero;
