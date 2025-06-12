import { Input } from "@/common/Input/Input";
// import { useState } from "react";
import { Icons } from "@/assets/Index";
import { Link } from "react-router-dom";
import Button from "@/common/Button";
import { Layout } from "../layout";
import { ROUTES_ENUM } from "@/constants/routes.constant";
export const CreatePassword = () => {
//   const [payload, setPayload] = useState({
//     password: "",
//     passConfirm: "",
//   });
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center h-full gap-y-3 min-h-[75vh] sm:px-2 md:px-10">
        <div className="flex flex-col w-full  gap-y-3">
          <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
            <p className="text-semi-dark dark:text-white text-xl font-semibold">Create Password</p>
            <p className="text-sm text-gray">Create new password</p>
          </div>
          <Input
            // value={payload?.password}
            placeholder="Password"
            icon={Icons?.lock}
            type="password"
            showPasswordToggle={true}
            onChange={(e) => console.log("password", e)}
          />
          <Input
            // value={payload?.passConfirm}
            placeholder="Confirm Password"
            icon={Icons?.lock}
            type="password"
            showPasswordToggle={true}
            onChange={(e) => console.log("confirm password", e)}
          />
          <Link to={ROUTES_ENUM?.PASS_CHANGE}>
            <Button
              label="Create Password"
              className="bg-blue w-full text-white rounded-lg mt-4 "
            />
          </Link>
          <div className="flex w-full justify-center gap-x-2 mt-4">
            <p className="text-semi-dark dark:text-white">Remember password?</p>
            <Link to={"#"} className="text-blue">
              Login now
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
