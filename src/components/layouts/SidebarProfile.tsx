import React, { useCallback, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

import useMe from "../../hooks/useMe";
import Drop from "../Drop";

const SidebarProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useMe();

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
            src={me.value?.profileImage || "./images/anonymous.jpg"}
            alt="ProfileImage"
            referrerPolicy="no-referrer"
            className="w-full"
          />
        </div>

        <div className="hidden lg:flex flex-col items-start">
          <span className="font-bold">{me.value?.username}</span>
          <span className="text-gray-500">@{me.value?.username}</span>
        </div>

        <div className="hidden lg:block ml-auto">
          <IoEllipsisHorizontal />
        </div>
      </button>
    </div>
  );
};

export default SidebarProfile;
