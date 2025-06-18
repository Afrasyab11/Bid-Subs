import { useState } from "react";
import { Layout } from "../layout";
import { OTPInput } from "@/common/Otp-Input/OTP";

export const OTP = () => {
  const [payload, setPayload] = useState({
    otp: "",
  });

  const handleOTPSubmit = (otp: any) => {
    setPayload(otp);
    alert(`OTP submitted: ${otp}`);
  };
  console.log(payload);
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center h-full gap-y-3 min-h-[75vh] sm:px-2 md:px-10">
        <OTPInput onSubmit={handleOTPSubmit} />
      </div>
    </Layout>
  );
};
