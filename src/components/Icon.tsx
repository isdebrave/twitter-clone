import React from "react";
import { IconType } from "react-icons";

interface IconProps {
  onClick: (e?: React.MouseEvent) => void;
  icon: IconType;
  length: number;
  groupTextHoverColor: string;
  groupBgHoverColor: string;
  textColor: string;
}

const Icon: React.FC<IconProps> = ({
  onClick,
  icon: Icon,
  length,
  groupTextHoverColor,
  groupBgHoverColor,
  textColor,
}) => {
  return (
    <div className="flex items-center group cursor-pointer" onClick={onClick}>
      <div
        className={`p-2 rounded-full ${groupBgHoverColor} transition translate-y-[1px]`}
      >
        <Icon
          size={20}
          className={`${textColor} ${groupTextHoverColor} transition`}
        />
      </div>
      <span className={`${textColor} ${groupTextHoverColor} transition`}>
        {length}
      </span>
    </div>
  );
};

export default Icon;
