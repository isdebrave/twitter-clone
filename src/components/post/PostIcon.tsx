import React from "react";
import { IconType } from "react-icons";

interface PostIconProps {
  icon: IconType;
  length: number;
  groupTextHoverColor: string;
  groupBgHoverColor: string;
}

const PostIcon: React.FC<PostIconProps> = ({
  icon: Icon,
  length,
  groupTextHoverColor,
  groupBgHoverColor,
}) => {
  return (
    <div className="flex items-center group cursor-pointer">
      <div className={`p-2 rounded-full ${groupBgHoverColor} transition`}>
        <Icon
          size={20}
          className={`text-gray-500 ${groupTextHoverColor} transition`}
        />
      </div>
      <span className={`${groupTextHoverColor} transition`}>{length}</span>
    </div>
  );
};

export default PostIcon;
