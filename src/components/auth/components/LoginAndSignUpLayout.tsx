import { Signup } from "./SignUp";
import { Login } from "./Login";
import SmoothTabs from "@/common/Tabs/Tabs";
import { Icons } from "@/assets/Index";
import Image from "@/common/image/Image";
import { ButtonWithIcon } from "@/common/Button";
import { useState } from "react";
import { Layout } from "../layout";
export const LoginAndSignUp = () => {
  const [activeTab, setActiveTab] = useState(0);


  const tabItems = [
    {
      label: "Sign in",
      content: <Login />,
    },
    {
      label: "Sign up",
      content: <Signup />,
    },
  ];
  return (
    <Layout>
      <div className="sm:px-2 md:px-10">
        <SmoothTabs
          tabs={tabItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex flex-col w-full gap-y-3">
          <ButtonWithIcon
            label="Continue with Google"
            className="bg-semi-dark rounded-lg text-white "
          >
            <Image src={Icons?.google} alt="google" className="h-6 w-6" />
          </ButtonWithIcon>
          <ButtonWithIcon
            label="Continue with LinkedIn"
            className="bg-semi-dark  rounded-lg text-white"
          >
            <Image src={Icons?.linkedIn} alt="linkdIn" className="h-6 w-6" />
          </ButtonWithIcon>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
          <p className="text-white text-xl font-semibold">
            {activeTab === 0 ? "Sign in to your account" : "Create your account"}
          </p>
          <p className="text-white text-sm">
            {activeTab === 0 ? "Welcome back! Please enter your details" : "Please enter your details"}
          </p>
        </div>
        <div className="relative">
          {tabItems.map((tab: any, index: any) => (
            <div
              key={index}
              className={`
              absolute w-full transition-all duration-300 ease-out
              ${
                activeTab === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }
            `}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
