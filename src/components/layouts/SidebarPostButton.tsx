import React from "react";
import { FiFeather } from "react-icons/fi";

import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";
import usePostModal from "../../hooks/usePostModal";
import Button from "../Button";

const SidebarPostButton = () => {
  const postModal = usePostModal();

  return (
    <>
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
            lg:hidden
        `}
      >
        <FiFeather size={32} />
      </button>

      <div className="hidden lg:block">
        <Button
          onClick={postModal.onOpen}
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
