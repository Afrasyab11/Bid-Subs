import Button from "@/common/Button";
import { Input } from "@/common/Input/Input";
import { useState } from "react";
import Image from "@/common/image/Image";
import { Icons } from "@/assets/Index";
export const JoinOurCommunity = () => {
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = () => {
    console.log("Email submitted:", email);
    // Handle email submission logic here
    setEmail("");
  };

  return (
    <div className="bg-blue/60 dark:bg-join-community-bg-gradient w-full py-20 sm:px-3 md:px-16 rounded-[30px] relative">
      <Image
        src={Icons?.joinEllips}
        alt="join Ellips of Bids Subs"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-auto w-auto "
      />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="flex flex-col justify-center">
          <p className="sm:text-2xl md:text-4xl text-white">Join our Community</p>
          <p className="text-md text-white mt-4">
            Get instant access to weekly newsletter.
          </p>
          <div className="flex sm:flex-col sm:items-end md:flex-row  md:items-center gap-y-2 gap-x-1 sm:mt-4 md:mt-10">
            <Input
              onChange={handleEmailSubmit}
              placeholder="Enter your email"
              inputClassName="!bg-dark !max-w-[360px]"
              containerClassName="!max-w-[360px]"
            />

            <Button
              label="Notify me"
              className="bg-white text-semi-dark dark:!bg-blue rounded-md px-4 py-3 max-w-[117px] dark:!text-white text-nowrap"
            />
          </div>
        </div>
        <div className="relative flex justify-end ">
          <Image
            src={Icons?.joincommunity}
            alt="join community of Bids Subs"
            className="h-fulh md:max-h-[180px] md:w-[180px] lg:max-h-[289px] lg:w-[305px]  hidden md:block"
          />
        
        </div>
      </div>
    </div>
  );
};
