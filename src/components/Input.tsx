import React from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { IoIosCheckmark } from "react-icons/io";

interface patternProps {
  value: RegExp;
  message: string;
}

interface InputProps {
  id: string;
  type?: string;
  label: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  pattern?: patternProps;
  errors?: FieldErrors;
  validatedBadge?: boolean;
  onClick?: () => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  disabled,
  register,
  required,
  pattern,
  errors = {},
  validatedBadge,
  onClick,
  value,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...register(id, { required, pattern })}
        value={value}
        placeholder=""
        className={`
          peer
          border 
          p-1
          pt-6
          pl-4
          w-full
          rounded-md
          outline-none
          focus:border-2
          text-lg
          ${errors[id] && "border-rose-500"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-sky-500"}
        `}
      />
      {errors[id]?.message && (
        <span className="text-rose-500">{errors[id]?.message?.toString()}</span>
      )}
      <label
        htmlFor={id}
        className={`
          absolute
          text-gray-500
          top-4
          left-4
          scale-75
          -translate-y-4
          origin-left
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          transition
          ${errors[id] && "text-rose-500"}
          ${errors[id] ? "peer-focus:text-rose-500" : "peer-focus:text-sky-500"}
          cursor-text
          select-none
        `}
      >
        {label}
      </label>

      {validatedBadge && (
        <div className="absolute right-0 bottom-0 bg-green-500 rounded-full m-2">
          <IoIosCheckmark size={20} color="white" />
        </div>
      )}
    </div>
  );
};

export default Input;
