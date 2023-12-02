import React, { useCallback, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useSelector } from "react-redux";

import Drop from "../Drop";

import { RootState } from "../../redux/store";

const SidebarProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useSelector((state: RootState) => state.me);

  const clickHandler = useCallback(() => {
    setShowDrop((cur) => !cur);
  }, []);

  return (
    <div className="relative">
      {showDrop && <Drop top />}
      <button
        onClick={clickHandler}
        className="
          flex 
          flex-row 
          items-center 
          w-full
          gap-3 
          hover:bg-neutral-300/40 
          rounded-full 
          p-3
          cursor-pointer
          lg:py-2 
          lg:px-4 
        "
      >
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={me?.profileImage || ""}
            alt="ProfileImage"
            referrerPolicy="no-referrer"
            className="w-full"
          />
        </div>

        <div className="hidden lg:flex flex-col items-start">
          <span className="font-bold">{me?.username}</span>
          <span className="text-gray-500">@{me?.username}</span>
        </div>

        <div className="hidden lg:block ml-auto">
          <IoEllipsisHorizontal />
        </div>
      </button>
    </div>
  );
};

export default SidebarProfile;
