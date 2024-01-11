import React, { useCallback, useEffect } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

import Heading from "../../Heading";
import Input from "../../Input";

interface FourthBodyProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  isEmail: boolean;
  errors?: FieldErrors;
}

const FourthBody: React.FC<FourthBodyProps> = ({
  id,
  register,
  isEmail,
  errors,
}) => {
  const authHandler = useCallback(
    (again?: boolean) => {
      if (again) {
        toast.success("다시 보내드렸습니다.\n잠시 후 확인해보세요.");
      }

      axios
        .post(isEmail ? "/auth/email" : "/auth/phone", { id })
        .catch((error) => console.log(error));
    },
    [id, isEmail]
  );

  useEffect(() => {
    authHandler();
  }, [authHandler]);

  const email = (
    <p className="ml-2 mt-1 mb-20">
      이메일을 받지 못했으면{" "}
      <button
        className="text-sky-500 hover:underline cursor-pointer text-sm"
        onClick={authHandler.bind(null, true)}
      >
        여기
      </button>
      를 눌러주세요.
    </p>
  );

  const phone = (
    <p className="ml-2 mt-1 mb-20">
      SMS을 받지 못했으면{" "}
      <button
        className="text-sky-500 hover:underline cursor-pointer text-sm"
        onClick={authHandler.bind(null, true)}
      >
        여기
      </button>
      를 눌러주세요.
    </p>
  );

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <Heading
          title="코드를 보내 드렸습니다"
          subtitle={`${id} 인증을 위해 아래에 입력하세요.`}
          large
          bold
        />
      </div>
      <Input
        id="code"
        label="인증 코드"
        register={register}
        errors={errors}
        required
      />

      {isEmail ? email : phone}
    </div>
  );
};

export default FourthBody;
