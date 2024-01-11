import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface SelectProps {
  id: string;
  options: string[];
  label: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  label,
  register,
  required,
  errors = {},
  value,
}) => {
  return (
    <div className="relative grow">
      <select
        id={id}
        {...register(id, { required })}
        value={value}
        className={`
          peer 
          w-full
          border-2
          rounded-md
          outline-none 
          focus:border-sky-500 
          cursor-pointer 
          pt-7 
          appearance-none
          p-2
          ${errors[id] && "border-rose-500"}
          ${errors[id] && "focus:border-rose-500"}
        `}
      >
        <option disabled></option>
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
      <div
        className={`
          absolute
          right-0 
          top-1/2 
          -translate-y-1/2 
          px-2 
          peer-focus:text-sky-500 
          cursor-pointer
          ${errors[id] && "text-rose-500"}
          ${errors[id] && "peer-focus:text-rose-500"}
        `}
      >
        <IoChevronDown size={30} />
      </div>
      <label
        htmlFor={id}
        className={`
          absolute 
          left-0 
          m-2 
          text-gray-500 
          text-sm 
          peer-focus:text-sky-500
          ${errors[id] && "text-rose-500"}
          ${errors[id] && "peer-focus:text-rose-500"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
