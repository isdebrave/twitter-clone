import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../Input";
import Loader from "../Loader";

import {
  bgBlack,
  bgWhite,
  hoverGray,
  hoverLightWhite,
  textBlack,
  textWhite,
} from "../../helpers/colors";

import useMe from "../../hooks/useMe";

import { RootState } from "../../redux/store";
import { onLoginModalClose } from "../../redux/reducers/loginModal";
import { onRegisterModalOpen } from "../../redux/reducers/registerModal";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMe();

  const loginModal = useSelector((state: RootState) => state.loginModal);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { id: "", password: "" } });

  const data = watch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/auth/login", data);
      await mutate();
      setIsLoading(false);

      dispatch(onLoginModalClose());
      localStorage.setItem("auth", "true");
      navigate("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data);
        setIsLoading(false);
      }
    }
  };

  const bodyContent = (
    <div className="px-10 lg:px-20">
      <div className="flex flex-col gap-5 lg:px-10">
        <Heading title="Twitter 로그인하기" large bold />
        <div className="flex flex-col">
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
                label="Google 계정으로 로그인"
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
              label="이메일 주소"
              register={register}
              errors={errors}
              required
              value={data.id}
            />
            <Input
              id="password"
              label="비밀번호"
              type="password"
              register={register}
              errors={errors}
              required
              value={data.password}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const clickHandler = () => {
    dispatch(onLoginModalClose());
    dispatch(onRegisterModalOpen());
    reset();
  };

  const footerContent = (
    <div className="px-10 lg:px-20 space-y-3">
      <Button
        onClick={handleSubmit(onSubmit)}
        bgColor={bgBlack}
        textColor={textWhite}
        hoverColor={hoverLightWhite}
        label="다음"
        large
        bold
      />
      {/* <Button
        onClick={() => {}}
        bgColor={bgWhite}
        textColor={textBlack}
        hoverColor={hoverGray}
        label="비밀번호를 잊으셨나요?"
        large
        bold
      /> */}
      <p className="text-center">
        계정이 없으신가요?{" "}
        <button onClick={clickHandler} className="text-sky-500 hover:underline">
          가입하기
        </button>
      </p>
    </div>
  );

  return (
    <>
      {isLoading && <Loader size={80} fixed text />}
      <Modal
        isOpen={loginModal.isOpen}
        onClose={() => dispatch(onLoginModalClose())}
        title={BsTwitterX}
        body={bodyContent}
        footer={footerContent}
        icon={IoClose}
        reset={reset}
      />
    </>
  );
};

export default LoginModal;
