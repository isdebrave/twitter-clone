import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGithub } from "react-icons/ai";
import axios from "axios";

import {
  bgBlue,
  bgWhite,
  textBlack,
  textBlue,
  textWhite,
  hoverDarkBlue,
  hoverGray,
  hoverLightBlue,
} from "../constants/colors";

import Button from "../components/Button";

import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

const Auth = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.removeItem("auth");
    }
  }, []);

  return (
    <div
      className="
        flex
        flex-col 
        items-center 
        h-full 
        w-fit 
        mx-auto 
        lg:w-full 
        lg:flex-row
      "
    >
      <div
        className="
          w-full
          flex 
          flex-row 
          justify-start
          items-center  
          py-10 
          px-14
          lg:mx-auto 
          lg:max-w-[450px]
          grow
        "
      >
        <BsTwitterX className="text-5xl lg:w-full lg:h-full" />
      </div>

      <div
        className="
          flex 
          flex-col 
          justify-center 
          lg:ml-auto 
          py-10 
          px-14 
          min-w-[475px] 
          lg:py-26 
          lg:min-w-[692px] 
        "
      >
        <h1 className="text-5xl font-bold mb-16 md:text-6xl">
          지금 일어나고 있는 일
        </h1>
        <h3 className="text-4xl font-semibold mb-10">지금 가입하세요.</h3>

        <div className="flex flex-col max-w-[340px]">
          <div className="space-y-3 mb-3">
            <Link
              to={`${axios.defaults.baseURL}/auth/google`}
              className="block"
            >
              <Button
                onClick={() => localStorage.setItem("auth", "true")}
                icon={FcGoogle}
                bgColor={bgWhite}
                textColor={textBlack}
                hoverColor={hoverGray}
                label="Google 계정으로 가입하기"
              />
            </Link>
            <Link
              to={`${axios.defaults.baseURL}/auth/github`}
              className="block"
            >
              <Button
                onClick={() => localStorage.setItem("auth", "true")}
                icon={AiOutlineGithub}
                bgColor={bgWhite}
                textColor={textBlack}
                hoverColor={hoverGray}
                label="Github에서 가입하기"
              />
            </Link>
          </div>

          <div className="relative mb-3">
            <div className="absolute inset-0 flex flex-row items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-lg text-gray-600">또는</span>
            </div>
          </div>

          <div className="mb-3">
            <Button
              onClick={registerModal.onOpen}
              bgColor={bgBlue}
              textColor={textWhite}
              hoverColor={hoverDarkBlue}
              bold
              label="계정 만들기"
            />
          </div>

          <p className="text-xs text-gray-500 leading-3 mb-10">
            가입하시려면{" "}
            <Link to="#" className="text-sky-500 hover:underline">
              쿠키 사용
            </Link>
            을 포함해{" "}
            <Link to="#" className="text-sky-500 hover:underline">
              이용약관
            </Link>
            과{" "}
            <Link to="#" className="text-sky-500 hover:underline">
              개인정보 처리방침
            </Link>
            에 동의해야 합니다.
          </p>

          <h4 className="text-xl font-semibold mb-4">
            이미 트위터에 가입하셨나요?
          </h4>
          <Button
            onClick={loginModal.onOpen}
            bgColor={bgWhite}
            textColor={textBlue}
            hoverColor={hoverLightBlue}
            bold
            label="로그인"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
