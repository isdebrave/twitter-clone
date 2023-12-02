import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import Button from "../Button";

import FirstBody from "./RegisterModalBody/FirstBody";
import SecondBody from "./RegisterModalBody/SecondBody";
import ThirdBody from "./RegisterModalBody/ThirdBody";
import FourthBody from "./RegisterModalBody/FourthBody";
import FifthBody from "./RegisterModalBody/FifthBody";

import {
  bgBlack,
  bgBlue,
  hoverDarkBlue,
  hoverLightWhite,
  textWhite,
} from "../../constants/colors";

import { RootState } from "../../redux/store";
import { onRegisterModalClose } from "../../redux/reducers/registerModal";
import { onLoginModalOpen } from "../../redux/reducers/loginModal";

enum STEPS {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
}

const RegisterModal = () => {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.FIRST);
  const dispatch = useDispatch();
  const registerModal = useSelector((state: RootState) => state.registerModal);

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      id: "",
      month: "",
      day: "",
      year: "",
      birth: "",
      code: "",
      password: "",
    },
  });

  const name = watch("name");
  const id = watch("id");
  const month = watch("month");
  const day = watch("day");
  const year = watch("year");
  const birth = watch("birth");
  const password = watch("password");

  const onNext = () => {
    setStep((cur) => cur + 1);
  };

  const onBack = () => {
    setStep((cur) => cur - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step === STEPS.FOURTH) {
      try {
        await axios.post("/auth/email/code", { code: data.code });
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error?.response?.data);
        }
        return;
      }
    }

    if (step !== STEPS.FIFTH) {
      return onNext();
    }

    try {
      setIsLoading(true);

      await axios.post("/auth/register", data);
      localStorage.setItem("auth", "true");
      dispatch(onRegisterModalClose());
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent = <></>;
  if (step === STEPS.FIRST) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <FirstBody
          disabled={isLoading}
          isEmail={isEmail}
          onEmail={() => setIsEmail((cur) => !cur)}
          name={name}
          id={id}
          month={month}
          day={day}
          year={year}
          register={register}
          errors={errors}
          setError={setError}
          clearErrors={clearErrors}
        />
      </div>
    );
  }

  if (step === STEPS.SECOND) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <SecondBody setValue={setValue} year={year} month={month} day={day} />
      </div>
    );
  }

  if (step === STEPS.THIRD) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <ThirdBody
          disabled={isLoading}
          isEmail={isEmail}
          name={name}
          id={id}
          birth={birth}
          register={register}
          onClick={() => setStep(STEPS.FIRST)}
        />
      </div>
    );
  }

  if (step === STEPS.FOURTH) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <FourthBody
          id={id}
          disabled={isLoading}
          register={register}
          isEmail={isEmail}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.FIFTH) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <FifthBody
          disabled={isLoading}
          register={register}
          errors={errors}
          password={password}
        />
      </div>
    );
  }

  const clickHandler = useCallback(() => {
    dispatch(onRegisterModalClose());
    dispatch(onLoginModalOpen());
    setStep(STEPS.FIRST);
    reset();
  }, [dispatch, reset]);

  const footerContent = (
    <div className="px-10 lg:px-20">
      <Button
        onClick={handleSubmit(onSubmit)}
        bgColor={step !== STEPS.THIRD ? bgBlack : bgBlue}
        textColor={textWhite}
        hoverColor={step !== STEPS.THIRD ? hoverLightWhite : hoverDarkBlue}
        label={step !== STEPS.THIRD ? "다음" : "가입"}
        large
        bold
      />
      <p className="mt-3 text-center">
        이미 계정이 있으신가요?{" "}
        <button onClick={clickHandler} className="text-sky-500 hover:underline">
          로그인
        </button>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={
        step === STEPS.FIRST ? () => dispatch(onRegisterModalClose()) : onBack
      }
      icon={step === STEPS.FIRST ? IoClose : IoMdArrowBack}
      step={step}
      title={`5단계 중 ${step}단계`}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
};

export default RegisterModal;
