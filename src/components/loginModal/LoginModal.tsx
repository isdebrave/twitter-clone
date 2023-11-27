import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { bgWhite, hoverGray, textBlack } from "../../constants/colors";

import Modal from "../Modal";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../Input";

enum STEPS {
  FIRST = 1,
}

const LoginModal = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const user = useLoggedInUser();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { id: "", password: "" } });

  const id = watch("id");
  const password = watch("password");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/auth/login", { data });
      user.onLoggedIn(response.data);
      loginModal.onClose();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-5 lg:px-10">
      <Heading title="Twitter 로그인하기" large bold />
      <div className="flex flex-col">
        <div className="space-y-3 mb-3">
          <Link to={`${axios.defaults.baseURL}/auth/google`} className="block">
            <Button
              icon={FcGoogle}
              bgColor={bgWhite}
              textColor={textBlack}
              hoverColor={hoverGray}
              label="Google 계정으로 로그인"
            />
          </Link>
          <Link to={`${axios.defaults.baseURL}/auth/github`} className="block">
            <Button
              icon={AiOutlineGithub}
              bgColor={bgWhite}
              textColor={textBlack}
              hoverColor={hoverGray}
              label="Github에서 로그인"
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

        <div className="mb-20 space-y-3">
          <Input
            id="id"
            label="휴대폰 번호, 이메일 주소 또는 사용자 아이디"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            value={id}
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            value={password}
          />
        </div>
      </div>
    </div>
  );

  const clickHandler = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
    reset();
  }, [loginModal, registerModal, reset]);

  const footerContent = (
    <div className="mt-3 space-y-3">
      <Button
        onClick={() => {}}
        bgColor={bgWhite}
        textColor={textBlack}
        hoverColor={hoverGray}
        label="비밀번호를 잊으셨나요?"
        large
        bold
      />
      <p className="text-center">
        계정이 없으신가요?{" "}
        <button onClick={clickHandler} className="text-sky-500 hover:underline">
          가입하기
        </button>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      step={STEPS.FIRST}
      title={BsTwitterX}
      body={bodyContent}
      footer={footerContent}
      icon={IoClose}
      label="다음"
      reset={reset}
    />
  );
};

export default LoginModal;
