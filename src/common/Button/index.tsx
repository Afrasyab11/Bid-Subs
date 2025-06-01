import React from "react";
import { useNavigate } from "react-router-dom";

interface SquareButtonProps {
  text: string;
  path: string;
}

export const Button: React.FC<SquareButtonProps> = ({ text, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <button
      onClick={handleClick}
      className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg hover:cursor-pointer"
    >
      {text}
    </button>
  );
};

