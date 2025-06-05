import { Icons } from "@/assets/Index";
import Image from "@/common/image/Image";
import Button from "@/common/Button";
import { Layout } from "../layout";
import { Link } from "react-router-dom";
import { ROUTES_ENUM } from "@/constants/routes.constant";
export const PasswordChange = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center h-full gap-y-3 min-h-[75vh] sm:px-2 md:px-10">
        <div className=" w-full flex flex-col justify-center items-center  gap-y-3">
          <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
            <p className="text-white text-xl font-semibold">Password Changed</p>
          </div>
          <div className="bg-blue rounded-full w-auto max-w-16 max-h-16 flex items-center justify-center p-3">
            <Image src={Icons?.check} className="h-14 w-14 " />
          </div>
          <p className="text-gray text-sm">
            Your password changed successfully
          </p>
          <Link  to={ROUTES_ENUM?.DASHBOARD} className="w-full">
            <Button
              label="Confirm"
              className="bg-blue w-full text-white rounded-lg mt-4 "
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
};
