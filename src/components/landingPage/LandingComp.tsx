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
    <div className="bg-white dark:bg-dark overflow-x-hidden">
      <Header />
      <Hero />
      <div className="px-2 flex flex-col items-center justify-center sm:gap-y-16 md:gap-y-24">
        <div className="w-full md:w-[90%] mx-auto">
          <BuiltForBuilders />
          <WhyManualEstimating />
        </div>
        <AiDriven />
        <div className="w-full md:w-[90%] mx-auto">
          <SpeedAccuracyProfit />
          <HowItWorks />
        </div>
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
