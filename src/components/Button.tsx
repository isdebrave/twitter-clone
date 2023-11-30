import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  bold?: boolean;
  icon?: IconType;
  bgColor: string;
  textColor: string;
  hoverColor: string;
  large?: boolean;
  disabled?: boolean;
  fit?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  bold,
  icon: Icon,
  bgColor,
  textColor,
  hoverColor,
  large,
  disabled,
  fit,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        ${large ? "py-3" : "py-2"}
        px-10 
        flex 
        flex-row 
        justify-center
        items-center 
        border-2
        rounded-full 
        ${fit ? "w-fit" : "w-full"}
        transition
        ${bgColor}
        ${textColor}
        ${hoverColor}
      `}
    >
      {Icon && <Icon size={26} className="mr-2" />}
      <span
        className={`
          ${large ? "text-lg" : "text-base"}
          ${bold ? "font-semibold" : "font-normal"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default Button;
