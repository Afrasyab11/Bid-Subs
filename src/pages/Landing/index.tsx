import FAQs from "../../components/landingPage/components/FAQs";
import Features from "../../components/landingPage/components/Features";
import HowItWorks from "../../components/landingPage/components/HowItWorks";
import PricingPlans from "../../components/landingPage/components/PricingPlans";
import Testimonials from "../../components/landingPage/components/Testimonials";

const Landing = () => {
  return (
    <div className="bg-dark ">
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col items-center justify-center gap-[80px]">
        <Features />
        <HowItWorks />
        <FAQs />
        <PricingPlans />
        <Testimonials />
      </div>
    </div>
  );
};

export default Landing;
