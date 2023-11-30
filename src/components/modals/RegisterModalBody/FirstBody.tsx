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

const namePattern = {
  value: /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
  message: "이름을 입력해 주세요.",
};

const phonePattern = {
  value: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/,
  message: "올바른 휴대폰 번호를 입력해 주세요.",
};

const emailPattern = {
  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  message: "올바른 이메일을 입력해 주세요.",
};

interface FirstBodyProps {
  disabled: boolean;
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
  disabled,
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
          setError("id", {
            message: error?.response?.data,
          });
        }
        return;
      });
    }
  }, [isEmail, id, clearErrors, setError]);

  useEffect(() => {
    if (month === "2월") {
      if (+year % 4 === 0) {
        return setCustomizedDays(days.slice(0, -2));
      } else {
        return setCustomizedDays(days.slice(0, -3));
      }
    }

    if (
      month === "4월" ||
      month === "6월" ||
      month === "9월" ||
      month === "11월"
    ) {
      return setCustomizedDays(days.slice(0, -1));
    }

    return setCustomizedDays(days);
  }, [month, year]);

  return (
    <div className="flex flex-col gap-5">
      <Heading title="계정을 생성하세요" large bold />
      <Input
        id="name"
        label="이름"
        disabled={disabled}
        register={register}
        errors={errors}
        required
        pattern={namePattern}
        value={name}
      />
      <Input
        id="id"
        label={isEmail ? "이메일" : "휴대폰"}
        disabled={disabled}
        register={register}
        errors={errors}
        required
        pattern={isEmail ? emailPattern : phonePattern}
        value={id}
      />
      <div className="text-end">
        <button
          onClick={onEmail}
          className="inline-block text-sky-500 hover:underline cursor-pointer"
        >
          대신 {isEmail ? "휴대폰" : "이메일"} 사용하기
        </button>
      </div>

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
