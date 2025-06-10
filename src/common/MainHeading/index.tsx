import React from "react";

interface HeadingProps {
  heading?: string;
  subheading?: string;
  classname?: string;
}

const MainHeading: React.FC<HeadingProps> = ({ heading, subheading ,classname }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white rounded-2xl">
      <h1 className={`${classname} font-normal text-[25px] leading-10 sm:leading-9  md:text-[36px] lg:text-[42px] lg:leading-snug`}>
        {heading}
      </h1>
      <p className="text-[20px] sm:text-[15px] md:text-[20px] text-center">{subheading}</p>
    </div>
  );
};

export default MainHeading;
