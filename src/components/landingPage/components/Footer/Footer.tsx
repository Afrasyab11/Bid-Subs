import React, { useState } from "react";
import { Icons } from "@/assets/Index";
import Image from "@/common/image/Image";
import { Input } from "@/common/Input/Input";
import Button from "@/common/Button";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useSession } from "@/sessionManager/SessionContext";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const { theme } = useSession();

  console.log("THEME:", theme);

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
    setEmail("");
  };

  const social = [
    {
      icon: Icons?.facebook,
    },
    { icon: Icons?.twiter },
    { icon: Icons?.insta },
    { icon: Icons?.youtube },
    { icon: Icons?.tiktok },
  ];

  return (
    <div className="w-full py-10  bg-semi_blue dark:bg-navy_blue  rounded-tl-[60px] rounded-tr-[60px]">
      <div className="px-2 w-full md:w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center">
              <Image
                src={theme === "light" ? Icons?.lightLogo : Icons?.darkAuthLogo}
                className="h-auto w-auto"
                alt="Dark logo"
              />
            </div>

            <p className="text-md text-semi-dark dark:text-white mt-4 mx-auto md:mx-0 w-[70%] text-center md:text-left ">
              <strong>BidSubs</strong> uses AI to turn blueprints into accurate
              bids—fast, simple, and built for subcontractors.
            </p>
          </div>
          <div className="flex items-center justify-center md:justify-end sm:flex-wrap md:flex-nowrap mt-3 w-full">
            {social?.map((item: any) => (
              <Image
                src={item?.icon}
                alt="Bids subs social icons"
                className="h-[50px] w-[50px] md:h-[80px] md:w-[80px]"
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
            {/* Column 1 */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-xl text-semi-dark dark:text-white font-semibold">
                Useful Links
              </span>
              <div className="flex flex-col gap-y-4 mt-4">
                <Link to="#" className="text-sm text-semi-dark dark:text-white">
                  Cookies Policy
                </Link>
                <Link to="#" className="text-sm text-semi-dark dark:text-white">
                  About Us
                </Link>
                <Link to="#" className="text-sm text-semi-dark dark:text-white">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="text-xl text-semi-dark dark:text-white font-semibold">
                Download Our Apps
              </span>
              <div className="flex items-center gap-x-1 mt-4">
                <MdOutlineEmail
                  size={22}
                  className="h-5 w-5 text-semi-dark dark:text-white"
                />
                <p className="text-sm text-semi-dark dark:text-white">
                  designer@@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-x-1 mt-4">
                <MdOutlineLocalPhone
                  size={22}
                  className="h-5 w-5 text-semi-dark dark:text-white"
                />
                <p className="text-sm text-semi-dark dark:text-white">
                  +92 311 1234567
                </p>
              </div>
            </div>

            {/* Column 3: Centered on md screens only */}
            {/* Column 3: full width below on large screens, centered content */}
            <div className="flex flex-col items-center text-center col-span-1 md:col-span-2 lg:col-span-1">
              <span className="text-xl text-semi-dark dark:text-white font-semibold">
                You can Find us On!
              </span>
              <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-1 mt-4 w-full justify-center">
                <Input
                  onChange={handleEmailSubmit}
                  placeholder="Enter your email"
                  inputClassName="!bg-dark w-full md:w-auto"
                />
                <Button
                  label="Notify me"
                  className="bg-white text-semi-dark dark:!bg-primary rounded-md px-4 py-3 max-w-[117px] dark:!text-white text-nowrap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
