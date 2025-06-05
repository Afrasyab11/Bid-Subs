import SecoundBox from "./components/SecoundBox/SecoundBox";
import FAQs from "./components/FAQs/Faqs";
import Features from "./components/Features/Features";
import { Header } from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import Testimonials from "./components/Testimonials/Testimonials";
import WhyManualEstimating from "./components/WhyManualEstimating/WhyManualEstimating";
export const Landing = () => {
  
  return (
    <div className="bg-dark ">
      <Header/>
        <Hero/>
      <div className="w-[95%] md:w-[90%] mx-auto flex flex-col items-center justify-center gap-[80px]">
        <SecoundBox/>
        <WhyManualEstimating/>
        <Features />
        <HowItWorks />
        <FAQs />
        <PricingPlans />
        <Testimonials />
      </div>
    </div>
  );
};

