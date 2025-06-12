import React, { useState } from "react";
import { Icons } from "@/assets/Index";
import Image from "@/common/image/Image";
import { Input } from "@/common/Input/Input";
import Button from "@/common/Button";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
    // Handle email submission logic here
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
    <div className="w-full pt-10 md:pt-16 md:pb-0 lg:py-16  bg-semi_blue dark:bg-navy_blue sm:px-2 md:px-4 lg:px-16 rounded-tl-[60px] rounded-tr-[60px]">
      <div className="grid grid-cols-12 md:grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-y-4 w-full">
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-8">
          <span className="text-3xl text-semi-dark dark:text-white font-semibold">
            LOGO HERE
          </span>
          <p className="text-md text-semi-dark dark:text-white mt-4 w-full max-w-md">
            <strong>BidSubs</strong> uses AI to turn blueprints into accurate
            bids—fast, simple, and built for subcontractors.
          </p>
        </div>
        <div className="sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4 hidden lg:block">
          <div className="flex items-center sm:flex-wrap md:flex-nowrap  ">
            {social?.map((item: any) => (
              <Image
                src={item?.icon}
                alt="Bids subs social icons"
                className="h-24 w-24"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 md:grid md:grid-cols-12 gap-y-6 w-full mt-8">
        <div className="sm:col-span-12 md:col-span-4">
          <span className="text-xl text-semi-dark dark:text-white font-semibold">
            Useful Links
          </span>
          <div className="flex  flex-col gap-y-4 mt-4">
            <Link to={"#"} className="text-sm text-semi-dark dark:text-white">
              Cookies Linkolicy
            </Link>
            <Link to={"#"} className="text-sm text-semi-dark dark:text-white">
              About Us
            </Link>
            <Link to={"#"} className="text-sm text-semi-dark dark:text-white">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-4">
          <span className="text-xl text-semi-dark dark:text-white font-semibold">
            Download Our Apps
          </span>
          <div className="flex items-center gap-x-1 mt-4">
            {/* <Image src={Icons?.emailWhite} alt="email" className="h-5 w-5 dark:invert" /> */}
            <MdOutlineEmail
              size={22}
              className="h-5 w-5 text-semi-dark dark:text-white"
            />
            <p className="text-semi-dark dark:text-white text-sm">
              designer@@gmail.com
            </p>
          </div>
          <div className="flex items-center gap-x-1 mt-4">
            <MdOutlineLocalPhone
              size={22}
              className="h-5 w-5 text-semi-dark dark:text-white"
            />

            {/* <Image src={Icons?.phone} alt="phone" className="h-5 w-5" /> */}
            <p className="text-semi-dark dark:text-white text-sm">
              +92 311 1234567
            </p>
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-4">
          <span className="text-xl text-semi-dark dark:text-white font-semibold">
            You can Find us On!
          </span>
          <div className="w-full flex sm:items-end sm:flex-col md:flex-col md:items-end lg:flex-row sm:flex-wrap md:flex-nowrap gap-y-2 items-center gap-x-1 mt-4">
            <Input
              onChange={handleEmailSubmit}
              placeholder="Enter your email"
              inputClassName="!bg-dark"
            />
            <Button
              label="Notify me"
              className="bg-white text-semi-dark dark:!bg-blue rounded-md px-4 py-3 max-w-[117px] dark:!text-white text-nowrap"
            />
          </div>
        </div>
      </div>
      <div className="w-full  block lg:hidden mt-8">
        <div className="w-full flex justify-center  items-center sm:flex-wrap">
          {social?.map((item: any) => (
            <Image
              src={item?.icon}
              alt="Bids subs social icons"
              className="h-24 w-24"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
