import React from "react";
import { useNavigate } from "react-router-dom";

interface SquareButtonProps {
  text: string;
  path: string;
  classname:string;
}

export const Button: React.FC<SquareButtonProps> = ({ text, path , classname }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleClick}
      className={`${classname} px-6 py-2 bg-dark hover:bg-dark/80 text-white max-sm:text-xs hover:cursor-pointer`}
    >
      {text}
    </button>
  );
};

