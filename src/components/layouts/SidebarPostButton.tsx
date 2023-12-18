import React from "react";
import { FiFeather } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";

import Button from "../Button";

import { onWritePostModalOpen } from "../../redux/reducers/writePostModal";

const SidebarPostButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(onWritePostModalOpen())}
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
            lg:hidden
        `}
      >
        <FiFeather size={32} />
      </button>

      <div className="hidden lg:block">
        <Button
          onClick={() => dispatch(onWritePostModalOpen())}
          bgColor={bgBlue}
          textColor={textWhite}
          hoverColor={hoverDarkBlue}
          label="Post"
          large
          bold
        />
      </div>
    </>
  );
};

export default SidebarPostButton;
