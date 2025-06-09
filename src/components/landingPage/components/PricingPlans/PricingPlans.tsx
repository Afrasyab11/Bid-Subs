import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Icons } from "@/assets/Index";
import MainHeading from "@/common/MainHeading";
import { Plans } from "@/constants";

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
        <div className="bg-slate-800 p-1 rounded-lg flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer ${
                selectedTab === tab
                  ? "bg-dark text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Plans?.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#0F1C32] rounded-xl relative p-8 border border-slate-600"
          >
            <img
              src={Icons?.Ellipse}
              alt="Card Top"
              className="absolute top-0"
            />
            {/* Plan Title */}
            <h3 className="text-white text-xl font-semibold mb-6">
              {plan.title}
            </h3>

            {/* Price */}
            <div className="mb-8">
              <span className="text-blue-400 text-4xl font-bold">
                {plan.price}
              </span>
              <span className="text-slate-400 text-lg ml-2">{plan.period}</span>
            </div>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium mb-8 transition-colors hover:cursor-pointer ${
                plan.isPopular
                  ? "bg-dark hover:bg-dark/80 text-white"
                  : "bg-white hover:bg-gray-100 text-slate-900"
              }`}
            >
              Choose Plan
            </button>

            {/* Features */}
            <div className="space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <FiCheck className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-300 text-sm leading-relaxed">
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
