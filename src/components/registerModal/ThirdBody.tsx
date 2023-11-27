import React from "react";
import { Link } from "react-router-dom";
import { UseFormRegister, FieldValues } from "react-hook-form";

import Heading from "../Heading";
import Input from "../Input";

interface ThirdBodyProps {
  disabled: boolean;
  isEmail: boolean;
  name: string;
  id: string;
  birth: string;
  register: UseFormRegister<FieldValues>;
  onClick: () => void;
}

const ThirdBody: React.FC<ThirdBodyProps> = ({
  disabled,
  isEmail,
  name,
  id,
  birth,
  register,
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Heading title="계정을 생성하세요" large bold />
      <Input
        id="name"
        label="이름"
        disabled={disabled}
        register={register}
        validatedBadge
        onClick={onClick}
        value={name}
      />
      <Input
        id="id"
        label={isEmail ? "이메일" : "휴대폰"}
        disabled={disabled}
        register={register}
        validatedBadge
        onClick={onClick}
        value={id}
      />
      <Input
        id="birth"
        label="생년월일"
        disabled={disabled}
        register={register}
        validatedBadge
        onClick={onClick}
        value={birth}
      />
      <p className="mt-20 mb-6 text-xs text-gray-500">
        가입하면{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          쿠키 사용
        </Link>
        을 포함해{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          이용약관
        </Link>{" "}
        및{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          개인정보 처리방침
        </Link>
        에 동의하게 됩니다. X는 계정을 안전하게 보호하고 광고를 포함한 맞춤
        서비스를 제공하는 등 X 개인정보 처리방침에 명시된 목적을 위해 이메일
        주소 및 전화번호 등의 내 연락처 정보를 사용할 수 있습니다.{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          자세히 알아보기
        </Link>
        . 이메일 또는 전화번호를 제공하시면 다른 사람들이 이 정보로 내 계정을
        찾을 수 있게 됩니다. 해당 정보를 제공하지 않으시려면{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          여기
        </Link>
        에서 변경하세요.
      </p>
    </div>
  );
};

export default ThirdBody;
