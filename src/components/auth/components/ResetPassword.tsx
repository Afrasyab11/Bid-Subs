import { Input } from "@/common/Input/Input";
// import { useState } from "react";
import { Icons } from "@/assets/Index";
import { Link } from "react-router-dom";
import Button from "@/common/Button";
import { Layout } from "../layout";
import { ROUTES_ENUM } from "@/constants/routes.constant";
export const ResetPassword = () => {
  // const [payload, setPayload] = useState({
  //   password: "",
  // });
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center h-full gap-y-3 min-h-[75vh] sm:px-2 md:px-10">
        <div className=" w-full flex flex-col  gap-y-3">
          <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
            <p className="text-semi-dark dark:text-white text-xl font-semibold">Reset Password</p>
            <p className="text-gray text-sm">
              Type your registered email to reset your password
            </p>
          </div>
          <Input
            // value={payload?.password}
            placeholder="Password"
            icon={Icons?.lock}
            type="password"
            showPasswordToggle={true}
            onChange={(e) => console.log("password", e)}
          />
          <Link to={ROUTES_ENUM?.OPT}>
            <Button
              label="Reset Password"
              className="bg-blue w-full text-white rounded-lg mt-4 "
            />
          </Link>
          <div className="flex w-full justify-center gap-x-2 mt-4">
            <p className="text-semi-dark dark:text-white">Remember password?</p>
            <Link to={ROUTES_ENUM?.LOGIN} className="text-blue">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
