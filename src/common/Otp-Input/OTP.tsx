import { ROUTES_ENUM } from "@/constants/routes.constant";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onSubmit?: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onSubmit,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOnChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];

    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (value && index < length - 1) {
      setActiveOTPIndex(index + 1);
    }

    const otpValue = newOTP.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveOTPIndex(index - 1);
    }

    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (): void => {
    const otpValue = otp.join("");
    if (otpValue.length === length && onSubmit) {
      onSubmit(otpValue);
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.slice(0, length).split("");

    const newOTP = [...otp];
    pasteArray.forEach((char, index) => {
      if (index < length && /^\d$/.test(char)) {
        newOTP[index] = char;
      }
    });

    setOtp(newOTP);
    setActiveOTPIndex(Math.min(pasteArray.length, length - 1));
    const otpValue = newOTP.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  useEffect(() => {
    inputRefs.current[activeOTPIndex]?.focus();
  }, [activeOTPIndex]);

  const isComplete = otp.join("").length === length;

  return (
    <div className="w-full max-w-md">
      <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4 mb-7 ">
        <p className="text-semi-dark dark:text-white text-xl font-semibold">
          OTP Code
        </p>
        <p className=" text-sm text-gray">
          Type the code we have sent you on your registered email
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(ref: any) => (inputRefs.current[index] = ref)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => setActiveOTPIndex(index)}
            className={`
              sm:w-10 sm:h-10  md:w-14 md:h-14 bg-slate-800 border-2 rounded-lg text-center text-xl font-semibold text-white
                transition-all duration-200 outline-none
                ${
                  activeOTPIndex === index
                    ? "border-blue-500 ring-2 ring-blue-500/20"
                    : digit
                    ? "border-blue-600"
                    : "border-slate-600 hover:border-slate-500"
                }
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              `}
            autoComplete="off"
          />
        ))}
      </div>

      <Link to={ROUTES_ENUM?.CRE_PASSWORD}>
        <Button
          label="Submit"
          onClick={()=>handleSubmit()}
          className={` w-full text-white rounded-lg mt-4  ${
            isComplete
              ? "bg-blue text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              : "bg-slate-700 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isComplete}
        />
      </Link>

      <div className="flex w-full justify-center gap-x-2 mt-4">
        <p className="text-semi-dark dark:text-white">
          Code can be resend in 00:35
        </p>
      </div>
      <Button label="Send" className="text-gray bg-transparent" />
    </div>
  );
};


