import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import { MeState } from "../../redux/reducers/me";

interface WritePostFormBodyProps {
  me: MeState;
  register: UseFormRegister<FieldValues>;
  showDivision: boolean;
}

const WritePostFormBody: React.FC<WritePostFormBodyProps> = ({
  me,
  register,
  showDivision,
}) => {
  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = document.querySelector("textarea")!;
    textarea.style.height = "auto";

    const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
    textarea.style.maxHeight = "450px";
    textarea.style.height = scrollHeight + "px";
  };

  return (
    <div className="px-6">
      <div className="flex gap-3 mb-4">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={me.profileImage || "/images/anonymous.jpg"}
            alt="ProfileImage"
            className="w-full"
          />
        </div>
        <textarea
          placeholder="What is happening?!"
          {...register("body", { required: true })}
          rows={2}
          className="
            flex-auto 
            resize-none 
            outline-none 
            text-xl 
            placeholder-gray-500
          "
          onKeyDown={keyDownHandler}
        ></textarea>
      </div>

      {showDivision && <hr className="my-3" />}
    </div>
  );
};

export default WritePostFormBody;
