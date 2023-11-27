import React, { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import Modal from "../Modal";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useLoggedInUser from "../../hooks/useLoggedInUser";

import FirstBody from "./FirstBody";
import SecondBody from "./SecondBody";
import ThirdBody from "./ThirdBody";
import FourthBody from "./FourthBody";
import FifthBody from "./FifthBody";

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
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const user = useLoggedInUser();

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

      const response = await axios.post("/auth/register", { data });
      user.onLoggedIn(response.data);
      registerModal.onClose();
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

  let bodyContent = <></>;
  if (step === STEPS.FIRST) {
    bodyContent = (
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
    );
  }

  if (step === STEPS.SECOND) {
    bodyContent = (
      <SecondBody setValue={setValue} year={year} month={month} day={day} />
    );
  }

  if (step === STEPS.THIRD) {
    bodyContent = (
      <ThirdBody
        disabled={isLoading}
        isEmail={isEmail}
        name={name}
        id={id}
        birth={birth}
        register={register}
        onClick={() => setStep(STEPS.FIRST)}
      />
    );
  }

  if (step === STEPS.FOURTH) {
    bodyContent = (
      <FourthBody
        id={id}
        disabled={isLoading}
        register={register}
        isEmail={isEmail}
        errors={errors}
      />
    );
  }

  if (step === STEPS.FIFTH) {
    bodyContent = (
      <FifthBody
        disabled={isLoading}
        register={register}
        errors={errors}
        password={password}
      />
    );
  }

  const clickHandler = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
    setStep(STEPS.FIRST);
    reset();
  }, [loginModal, registerModal, reset]);

  const footerContent = (
    <p className="mt-3 text-center">
      이미 계정이 있으신가요?{" "}
      <button onClick={clickHandler} className="text-sky-500 hover:underline">
        로그인
      </button>
    </p>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={step === STEPS.FIRST ? registerModal.onClose : onBack}
      onSubmit={handleSubmit(onSubmit)}
      step={step}
      icon={step === STEPS.FIRST ? IoClose : IoMdArrowBack}
      title={`5단계 중 ${step}단계`}
      body={bodyContent}
      footer={footerContent}
      label={step !== STEPS.THIRD ? "다음" : "가입"}
      reset={reset}
    />
  );
};

export default RegisterModal;
