import React from "react";
import { PricePlanCard } from "@/common/PricePlanCard";
import { evalPlans } from "@/constants";
export const EvalPlans: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <PricePlanCard list={evalPlans ?? []} />
    </div>
  );
};
