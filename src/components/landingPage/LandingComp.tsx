import FAQs from "./components/FAQs/Faqs";
import Features from "./components/Features/Features";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import Testimonials from "./components/Testimonials/Testimonials";
export const Landing = () => {
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

