import React from "react";
import { PricePlanCard } from "@/common/PricePlanCard";
import { expertPlans } from "@/constants";
export const ExpertPlans: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <PricePlanCard list={expertPlans ?? []} />
    </div>
  );
};
