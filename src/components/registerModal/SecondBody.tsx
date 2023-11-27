import React, { useEffect } from "react";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";

import Heading from "../Heading";

interface SecondBodyProps {
  setValue: UseFormSetValue<FieldValues>;
  year: string;
  month: string;
  day: string;
}

const SecondBody: React.FC<SecondBodyProps> = ({
  setValue,
  year,
  month,
  day,
}) => {
  useEffect(() => {
    setValue("birth", `${year}. ${month.slice(0, -1)}. ${day}`);
  }, [setValue, year, month, day]);

  return (
    <div className="flex flex-col gap-5">
      <Heading title="트위터 환경을 맞춤 설정하세요" large bold />
      <h4 className="mt-3 text-xl font-semibold">
        웹에서 내가 X의 콘텐츠를 보는 위치를 기록합니다
      </h4>
      <div className="flex leading-5 text-gray-500">
        <p>
          X는 이 데이터를 이용해 맞춤 경험을 제공합니다. 이 웹 탐색 내역을
          저장할 때 내 이름, 이메일, 휴대폰 번호는 절대 포함되지 않습니다.
        </p>
        <div className="ml-2">
          <input type="checkbox" className="w-[20px] h-[20px] cursor-pointer" />
        </div>
      </div>
      <p className="mt-5 mb-20 text-gray-500">
        가입하면 X의{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          이용약관
        </Link>
        ,{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          개인정보 처리방침
        </Link>{" "}
        및{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          쿠키 사용
        </Link>
        에 동의하게 됩니다. X에서는 개인정보 처리방침에 명시된 목적에 따라
        이메일 주소 및 전화번호 등 내 연락처 정보를 사용할 수 있습니다.{" "}
        <Link to="#" className="text-sky-500 hover:underline">
          자세히 알아보기
        </Link>
      </p>
    </div>
  );
};

export default SecondBody;
