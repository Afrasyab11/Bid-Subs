import { Input } from "@/common/Input/Input";
// import { useState } from "react";
import { Icons } from "@/assets/Index";
import { Link } from "react-router-dom";
import Button from "@/common/Button";
import { Layout } from "../layout";
import { ROUTES_ENUM } from "@/constants/routes.constant";
export const OTP = () => {
//   const [payload, setPayload] = useState({
//     otp: "",
//   });
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center h-full gap-y-3 min-h-[75vh] sm:px-2 md:px-10">
        <div className=" w-full flex flex-col  gap-y-3">
          <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
            <p className="text-white text-xl font-semibold">OTP Code</p>
            <p className=" text-sm text-gray">
              Type the code we have sent you on your registered email
            </p>
          </div>
          <Input
            // value={payload?.otp}
            placeholder="OTP"
            icon={Icons?.email}
            onChange={(e) => console.log("password", e)}
          />
          <Link to={ROUTES_ENUM?.PASS_CHANGE}>
            <Button
              label="Create Password"
              className="bg-blue w-full text-white rounded-lg mt-4 "
            />
          </Link>

          <div className="flex w-full justify-center gap-x-2 mt-4">
            <p className="text-white">Code can be resend in 00:35</p>
          </div>
          <Button label="Send" className="text-gray bg-transparent" />
        </div>
      </div>
    </Layout>
  );
};
