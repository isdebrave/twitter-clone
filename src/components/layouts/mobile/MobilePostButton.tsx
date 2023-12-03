import React from "react";
import { FiFeather } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { bgBlue, hoverDarkBlue, textWhite } from "../../../constants/colors";

import { onPostFormModalOpen } from "../../../redux/reducers/postFormModal";

const MobilePostButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute right-3 bottom-16">
      <button
        onClick={() => dispatch(onPostFormModalOpen())}
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
