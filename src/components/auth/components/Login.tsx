import { Input } from "@/common/Input/Input";
import { useState } from "react";
import { Icons } from "@/assets/Index";
import { Checkbox } from "@/common/Input/Input";
import { Link } from "react-router-dom";
import Button from "@/common/Button";
import { ROUTES_ENUM } from "@/constants/routes.constant";
export const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col gap-y-3">
      <Input
        value={payload?.email}
        placeholder="Email"
        icon={Icons?.email}
        onChange={(e) => console.log("email", e)}
      />

      <Input
        value={payload?.password}
        placeholder="Password"
        type="password"
        icon={Icons?.lock}
        onChange={(e) => console.log("password", e)}
        showPasswordToggle={true}
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3">
          <Checkbox value={true} />{" "}
          <label className="text-white text-sm">Remember me</label>
        </div>
        <Link to={ROUTES_ENUM?.RES_PASSWORD} className="text-white text-sm">
          Forgot Password?
        </Link>
      </div>
      <Link to={ROUTES_ENUM?.DASHBOARD} className="w-full">
        <Button
          label="Login"
          className="bg-blue w-full text-white rounded-lg mt-4"
        />
      </Link>
    </div>
  );
};
