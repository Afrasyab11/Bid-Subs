import React, { useState } from "react";
import { Icons } from "@/assets/Index";
import MainHeading from "@/common/MainHeading";
import { StarterPlusPlans } from "@/constants";
import Image from "@/common/image/Image";

const PricingPlans: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Starter Plus");

  const tabs = ["Starter Plus", "Expert", "Starter", "Eval to Live"];

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <MainHeading
        heading="Pricing Plans"
        subheading="Choose what's best for you"
      />

      {/* Tab Navigation */}
      <div className="flex justify-center my-10">
        <div className="bg-semi_blue dark:bg-slate-800 p-1 rounded-lg flex sm:overflow-x-scroll md:overflow-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-md text-nowrap text-sm font-medium transition-colors hover:cursor-pointer ${
                selectedTab === tab
                  ? "bg-blue text-white"
                  : "text-mid-gray dark:text-slate-300 "
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {StarterPlusPlans?.map((plan) => (
          <div
            key={plan.id}
            className="bg-semi_blue dark:bg-semi-dark rounded-xl relative p-8 "
          >
            <img
              src={Icons?.Ellipse}
              alt="Card Top"
              className="absolute top-0"
            />
            {/* Plan Title */}
            <h3 className="text-semi-dark dark:text-white text-xl font-semibold mb-6">
              {plan.title}
            </h3>

            {/* Price */}
            <div className="mb-8">
              <span className="text-blue text-4xl font-bold">
                {plan.price}
              </span>
              <span className="text-slate-400 text-lg ml-2">{plan.period}</span>
            </div>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium mb-8 transition-colors hover:cursor-pointer ${
                plan.isPopular
                  ? "bg-blue text-white"
                  : "bg-white hover:bg-gray-100 text-slate-900"
              }`}
            >
              Choose Plan
            </button>

            {/* Features */}
            <div className="space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-x-3">
                  <Image src={Icons?.checkPlan} alt="check" className="h-8 w-8" />
                  {/* <FiCheck className="w-5 h-5 text-blue mt-0.5 mr-3 flex-shrink-0" /> */}
                  <span className="text-semi-dark dark:text-slate-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;

// import React, { useState } from "react";
// import MainHeading from "@/common/MainHeading";
// import { StarterPlus } from "./components/StarterPlus";
// import { ExpertPlans } from "./components/Expert";
// import { Starter } from "./components/Starter";
// import { EvalPlans } from "./components/EvalToLive";
// import SmoothTabs from "@/common/Tabs/Tabs";
// const PricingPlans: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const tabItems = [
//     {
//       label: "Starter Plus",
//       content: <StarterPlus />,
//     },
//     {
//       label: "Expert",
//       content: <ExpertPlans />,
//     },
//     {
//       label: "Starter",
//       content: <Starter />,
//     },
//     {
//       label: "Eval to Live",
//       content: <EvalPlans />,
//     },
//   ];
//   return (
//     <div className="w-full ">
//       <MainHeading
//         heading="Pricing Plans"
//         subheading="Choose what's best for you"
//       />
//       <SmoothTabs
//         tabs={tabItems}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         activeButtonColor={"blue"}
//       />
//       <div className="relative">
//         {tabItems.map((tab: any, index: any) => (
//           <div
//             key={index}
//             className={`
//               absolute w-full transition-all duration-300 ease-out
//               ${
//                 activeTab === index
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-4 pointer-events-none"
//               }
//             `}
//           >
//             {tab.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;
