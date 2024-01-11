import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import axios, { AxiosError } from "axios";

import Heading from "../../Heading";
import Input from "../../Input";
import Select from "../../Select";

import {
  emailPattern,
  namePattern,
  phonePattern,
} from "../../../helpers/pattern";

const months: string[] = [];
for (let i = 1; i <= 12; i++) {
  months.push(i + "월");
}

const days: string[] = [];
for (let i = 1; i <= 31; i++) {
  days.push(i + "");
}

const years: string[] = [];
for (let i = new Date().getFullYear(); i >= 1903; i--) {
  years.push(i + "");
}

interface FirstBodyProps {
  isEmail: boolean;
  onEmail: () => void;
  name: string;
  id: string;
  month: string;
  day: string;
  year: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const FirstBody: React.FC<FirstBodyProps> = ({
  isEmail,
  onEmail,
  name,
  id,
  month,
  day,
  year,
  register,
  errors,
  setError,
  clearErrors,
}) => {
  const [customizedDays, setCustomizedDays] = useState(days);

  useEffect(() => {
    const email = id;
    const regex = new RegExp(emailPattern.value);

    clearErrors("id");
    if (isEmail && regex.test(email)) {
      axios.post("/auth/email/exist", { id }).catch((error) => {
        if (error instanceof AxiosError) {
          setError("id", { message: error.response?.data });
        }
        return;
      });
    }
  }, [isEmail, id, clearErrors, setError]);

  useEffect(() => {
    switch (month) {
      case "2월":
        if (+year % 4 === 0) {
          setCustomizedDays(days.slice(0, -2));
        } else {
          setCustomizedDays(days.slice(0, -3));
        }
        break;

      case "4월":
      case "6월":
      case "9월":
      case "11월":
        setCustomizedDays(days.slice(0, -1));
        break;
      default:
        setCustomizedDays(days);
    }
  }, [month, year]);

  return (
    <div className="flex flex-col gap-5">
      <Heading title="계정을 생성하세요" large bold />
      <Input
        id="name"
        label="이름"
        register={register}
        errors={errors}
        required
        pattern={namePattern}
        value={name}
      />
      <Input
        id="id"
        label={isEmail ? "이메일" : "휴대폰"}
        register={register}
        errors={errors}
        required
        pattern={isEmail ? emailPattern : phonePattern}
        value={id}
      />
      {/* <div className="text-end">
        <button
          onClick={onEmail}
          className="inline-block text-sky-500 hover:underline cursor-pointer"
        >
          대신 {isEmail ? "휴대폰" : "이메일"} 사용하기
        </button>
      </div> */}

      <div className="mb-20">
        <Heading
          title="생년월일"
          subtitle={`
            이 정보는 공개적으로 표시되지 않습니다.
            비즈니스, 반려동물 등 계정 주제에 상관없이 나의 연령을 확인하세요.
          `}
          bold
        />
        <div className="flex flex-row w-full gap-3 mt-5">
          <Select
            id="month"
            options={months}
            label="월"
            register={register}
            required
            errors={errors}
            value={month}
          />
          <Select
            id="day"
            options={customizedDays}
            label="일"
            register={register}
            required
            errors={errors}
            value={day}
          />
          <Select
            id="year"
            options={years}
            label="년"
            register={register}
            required
            errors={errors}
            value={year}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstBody;
