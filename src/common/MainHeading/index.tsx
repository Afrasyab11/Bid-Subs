import React from "react";

interface HeadingProps {
  heading?: string;
  subheading?: string;
  classname?: string;
}

const MainHeading: React.FC<HeadingProps> = ({ heading, subheading ,classname }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-white">
      <h1 className={`${classname} font-normal text-[30px] md:text-[36px] lg:text-[42px]`}>
        {heading}
      </h1>
      <p className="text-[20px] sm:text-sm md:text-[20px]">{subheading}</p>
    </div>
  );
};

export default MainHeading;
