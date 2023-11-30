import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "../../Heading";
import Input from "../../Input";

interface FifthBodyProps {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  password: string;
}

const passwordPattern = {
  value: /^.{8,}$/,
  message:
    "비밀번호는 최소 8자 이상이어야 합니다. 더 긴 비밀번호를 입력하세요.",
};

const FifthBody: React.FC<FifthBodyProps> = ({
  disabled,
  register,
  errors,
  password,
}) => {
  return (
    <div className="flex flex-col mb-20">
      <div className="mb-8">
        <Heading
          title="비밀번호가 필요합니다"
          subtitle="8자 이상이어야 합니다."
          large
          bold
        />
      </div>
      <Input
        id="password"
        label="비밀번호"
        disabled={disabled}
        register={register}
        errors={errors}
        required
        pattern={passwordPattern}
        value={password}
      />
    </div>
  );
};

export default FifthBody;
