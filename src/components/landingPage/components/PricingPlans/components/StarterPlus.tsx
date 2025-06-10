import React from "react";
import { PricePlanCard } from "@/common/PricePlanCard";
import { StarterPlusPlans } from "@/constants";
export const StarterPlus: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <PricePlanCard list={StarterPlusPlans ?? []} />
    </div>
  );
};
