import React from "react";
import { IconType } from "react-icons";

interface IconProps {
  onClick: (e: React.MouseEvent) => void;
  icon: IconType;
  length: number;
  textHover: string;
  bgHover: string;
  textColor: string;
}

const Icon: React.FC<IconProps> = ({
  onClick,
  icon: Icon,
  length,
  textHover,
  bgHover,
  textColor,
}) => {
  return (
    <div className="flex items-center group cursor-pointer" onClick={onClick}>
      <div
        className={`
          p-2 
          rounded-full 
          ${bgHover} 
          transition 
          translate-y-[1px]
        `}
      >
        <Icon size={20} className={`${textColor} ${textHover} transition`} />
      </div>
      <span className={`${textColor} ${textHover} transition`}>{length}</span>
    </div>
  );
};

export default Icon;
