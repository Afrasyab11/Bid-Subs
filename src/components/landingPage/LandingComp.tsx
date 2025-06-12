import FAQs from "./components/FAQs/Faqs";
// import Features from "./components/SpeedAccuracyProfit/SpeedAccuracyProfit";
import { SpeedAccuracyProfit } from "./components/SpeedAccuracyProfit/SpeedAccuracyProfit";
import { Header } from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import Testimonials from "./components/Testimonials/Testimonials";
import WhyManualEstimating from "./components/WhyManualEstimating/WhyManualEstimating";
import { AiDriven } from "./components/AiDriven/AiDreven";
import { Footer } from "./components/Footer/Footer";
import { JoinOurCommunity } from "./components/JoinCommunity/JoinOurCommunity";
import { BuiltForBuilders } from "./components/BuiltForBuilders/BuiltForBuilders";
export const Landing = () => {
  
  return (
    <div className="bg-white dark:bg-dark ">
      <Header/>
        <Hero/>
      <div className=" sm:px-2 md:px-[20px] lg:px-[40px] xl:px-[80px] flex flex-col items-center justify-center sm:gap-y-16 md:gap-y-24">
        <BuiltForBuilders/>
        <WhyManualEstimating/>
        <AiDriven/>
        <SpeedAccuracyProfit />
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

