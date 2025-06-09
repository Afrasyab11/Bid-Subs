import SecoundBox from "./components/SecoundBox/SecoundBox";
import FAQs from "./components/FAQs/Faqs";
import Features from "./components/Features/Features";
import { Header } from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import Testimonials from "./components/Testimonials/Testimonials";
import WhyManualEstimating from "./components/WhyManualEstimating/WhyManualEstimating";
import { AiDriven } from "./components/AiDriven/AiDreven";
import { Footer } from "./components/Footer/Footer";
import { JoinOurCommunity } from "./components/JoinCommunity/JoinOurCommunity";
export const Landing = () => {
  
  return (
    <div className="bg-dark ">
      <Header/>
        <Hero/>
      <div className=" sm:px-2 md:px-[80px] flex flex-col items-center justify-center gap-y-24">
        <SecoundBox/>
        <WhyManualEstimating/>
        <AiDriven/>
        <Features />
        <HowItWorks />
        <FAQs />
        <PricingPlans />
        <Testimonials />
        <JoinOurCommunity />
      </div>
      <div className="mt-24">
        <Footer />

      </div>
    </div>
  );
};

