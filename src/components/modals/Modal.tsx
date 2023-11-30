import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { UseFormReset, FieldValues } from "react-hook-form";

interface ModalProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  step?: number;
  title?: string | IconType;
  body: React.ReactElement;
  footer: React.ReactElement;
  icon: IconType;
  reset?: UseFormReset<FieldValues>;
}

const Modal: React.FC<ModalProps> = ({
  disabled,
  isOpen,
  onClose,
  step,
  title: Title,
  body,
  footer,
  icon: Icon,
  reset,
}) => {
  const closeHandler = useCallback(() => {
    if (disabled) {
      return;
    }

    if (reset) {
      if (step) {
        if (step === 1) {
          reset();
        }
      } else {
        reset();
      }
    }

    onClose();
  }, [step, disabled, reset, onClose]);

  if (!isOpen) {
    return null;
  }

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
            {Title ? (
              typeof Title === "string" ? (
                <h4 className="text-xl font-bold">{Title}</h4>
              ) : (
                <h4 className="text-xl font-bold absolute w-full flex justify-center">
                  <Title size={30} />
                </h4>
              )
            ) : null}
          </div>

          {body}
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
