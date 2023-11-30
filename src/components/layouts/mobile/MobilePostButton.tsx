import React from "react";
import { FiFeather } from "react-icons/fi";

import { bgBlue, hoverDarkBlue, textWhite } from "../../../constants/colors";
import usePostModal from "../../../hooks/usePostModal";

const MobilePostButton = () => {
  const postModal = usePostModal();

  return (
    <div className="absolute right-3 bottom-16">
      <button
        onClick={postModal.onOpen}
        className={`
          p-3 
          rounded-full 
          hover:bg-neutral-300/40 
          w-fit 
          cursor-pointer 
          flex 
          items-center 
          gap-4 
          text-xl
          ${bgBlue}
          ${textWhite}
          ${hoverDarkBlue}
        `}
      >
        <FiFeather size={30} />
      </button>
    </div>
  );
};

export default MobilePostButton;
