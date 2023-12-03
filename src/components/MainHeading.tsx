import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface ProfileHeadingProps {
  title: string;
  length?: number;
  onClick: () => void;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
  title,
  length,
  onClick,
}) => {
  return (
    <div
      className="
        z-10 
        sticky 
        top-0 
        bg-white 
        flex 
        items-center 
        py-1 
        px-2 
        gap-6
      "
    >
      <div
        onClick={onClick}
        className="p-2 rounded-full hover:bg-neutral-300/40 cursor-pointer"
      >
        <IoMdArrowBack size={20} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg">{title}</span>
        {length && (
          <span className="font-bold text-xs text-gray-400">
            {length} posts
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeading;
