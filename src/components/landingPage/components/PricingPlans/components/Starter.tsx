import React from "react";
import { PricePlanCard } from "@/common/PricePlanCard";
import { starterPlans } from "@/constants";
export const Starter: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <PricePlanCard list={starterPlans ?? []} />
    </div>
  );
};
