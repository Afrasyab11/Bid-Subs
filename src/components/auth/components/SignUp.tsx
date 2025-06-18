import { Input } from "@/common/Input/Input";
import { useState } from "react";
import { Icons } from "@/assets/Index";
import { Checkbox } from "@/common/Input/Input";
import Button from "@/common/Button";
export const Signup = () => {
  const [payload, setPayload] = useState({
    email: "",
    fullName: "",
    password: "",
    remember: false,
  });
  return (
    <>
      <div className="flex flex-col gap-y-3">
        <Input
          value={payload?.fullName}
          placeholder="Full Name"
          icon={Icons?.profile}
          onChange={(e) => setPayload({ ...payload, fullName: e.target.value })}
        />
        <Input
          value={payload?.email}
          placeholder="Email"
          icon={Icons?.email}
          onChange={(e) => setPayload({ ...payload, email: e.target.value })}
        />

        <Input
          value={payload?.password}
          placeholder="Password"
          type="password"
          icon={Icons?.lock}
          onChange={(e) => setPayload({ ...payload, password: e.target.value })}
          showPasswordToggle={true}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3">
            <Checkbox
              value={payload?.remember}
              onChange={(e) => {
                setPayload({ ...payload, remember: e.target.checked });
              }}
            />
            <label className="text-white text-sm">Remember me</label>
          </div>
        </div>
        <Button
          label="Sign up"
          className="bg-blue w-full text-white rounded-lg mt-2 mb-4"
        />
      </div>
    </>
  );
};
