import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { UseFormReset, FieldValues } from "react-hook-form";

import {
  bgBlack,
  bgBlue,
  hoverDarkBlue,
  hoverLightWhite,
  textWhite,
} from "../constants/colors";
import Button from "./Button";

interface ModalProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  step?: number;
  title: string | IconType;
  body: React.ReactElement;
  footer?: React.ReactElement;
  icon: IconType;
  reset?: UseFormReset<FieldValues>;
  label: string;
}

const Modal: React.FC<ModalProps> = ({
  disabled,
  isOpen,
  onClose,
  onSubmit,
  step,
  title: Title,
  body,
  footer,
  icon: Icon,
  reset,
  label,
}) => {
  const closeHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    if (step && step === 1 && reset) {
      reset();
    }

    onClose();
  }, [step, disabled, reset, onClose]);

  const submitHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  const bgColor = label === "가입" ? bgBlue : bgBlack;
  const textColor = textWhite;
  const hoverColor = label === "가입" ? hoverDarkBlue : hoverLightWhite;

  return (
    <div
      className="
        fixed 
        z-20 
        inset-0 
        flex
        justify-center 
        items-center 
        bg-neutral-800/70
      "
    >
      <div
        className="
          relative
          z-30 
          w-full 
          h-full 
          mx-auto 
          lg:max-w-2xl 
          lg:w-1/2 
          lg:h-auto
        "
      >
        {/* content */}
        <div
          className="
            bg-white 
            h-full 
            flex 
            flex-col 
            py-4 
            lg:rounded-2xl 
            lg:shadow-lg
          "
        >
          {/* header */}
          <div className="flex flex-row items-center mb-5 gap-7 relative">
            <button
              onClick={closeHandler}
              className="z-10 ml-3 p-2 rounded-full hover:bg-neutral-300/40 cursor-pointer"
            >
              <Icon size={22} />
            </button>
            {typeof Title === "string" ? (
              <h4 className="text-xl font-bold">{Title}</h4>
            ) : (
              <h4 className="text-xl font-bold absolute w-full flex justify-center">
                <Title size={30} />
              </h4>
            )}
          </div>

          {/* body */}
          <div className="px-10 lg:px-20">{body}</div>

          {/* footer */}
          <div className="px-10 lg:px-20">
            <Button
              onClick={submitHandler}
              bgColor={bgColor}
              textColor={textColor}
              hoverColor={hoverColor}
              label={label}
              large
              bold
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
