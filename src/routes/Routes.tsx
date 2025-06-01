import { Route, Routes } from "react-router-dom";
import { Landing } from "@/components/landingPage/LandingComp";
export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

