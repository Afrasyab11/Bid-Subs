import React from "react";
import { Icons } from "@/assets/Index";
import Image from "./image/Image";

interface PricePlanCardProps {
  list?: any;
}
export const PricePlanCard: React.FC<PricePlanCardProps> = ({ list }) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
        {list?.map((plan: any) => (
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
              <span className="text-primary text-4xl font-bold">{plan.price}</span>
              <span className="text-slate-400 text-lg ml-2">{plan.period}</span>
            </div>

            <button
              className={`w-full py-3 px-6 rounded-lg font-medium mb-8 transition-colors hover:cursor-pointer ${
                plan.isPopular
                  ? "bg-primary text-white"
                  : "bg-white hover:bg-gray-100 text-slate-900"
              }`}
            >
              Choose Plan
            </button>

            {/* Features */}
            <div className="space-y-4">
              {plan.features.map((feature: any, index: any) => (
                <div key={index} className="flex items-start gap-x-3">
                  <Image
                    src={Icons?.checkPlan}
                    alt="check"
                    className="h-8 w-8"
                  />
                  {/* <FiCheck className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" /> */}
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
  );
};
