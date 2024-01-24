import React from "react";
import { FiFeather } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { bgBlue, hoverDarkBlue, textWhite } from "../../../helpers/colors";

import { onWriteModalOpen } from "../../../redux/reducers/writePostModal";

const MobilePostButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed right-3 bottom-16">
      <button
        onClick={() => dispatch(onWriteModalOpen())}
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
