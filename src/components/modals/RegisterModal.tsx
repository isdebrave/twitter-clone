import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

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
} from "../../helpers/colors";

import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useMe from "../../hooks/useMe";

enum STEPS {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
}

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [step, setStep] = useState(STEPS.FIRST);

  const { mutate } = useMe();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const navigate = useNavigate();

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
      checked: false,
    },
  });

  const data = watch();

  const onNext = () => setStep((cur) => cur + 1);
  const onBack = () => setStep((cur) => cur - 1);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step === STEPS.SECOND) {
      const checked = data.checked;
      if (!checked) {
        return toast.error("체크 박스를 눌러주세요.");
      }
    }

    if (step === STEPS.FOURTH) {
      try {
        await axios.post("/auth/email/code", { code: data.code });
      } catch (error) {
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
      registerModal.onClose();

      setIsLoading(true);
      await axios.post("/auth/register", data);
      await mutate();
      setIsLoading(false);

      localStorage.setItem("auth", "true");
      navigate("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    }
  };

  let bodyContent = <></>;
  if (step === STEPS.FIRST) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <FirstBody
          isEmail={isEmail}
          onEmail={() => setIsEmail((cur) => !cur)}
          name={data.name}
          id={data.id}
          month={data.month}
          day={data.day}
          year={data.year}
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
        <SecondBody
          register={register}
          setValue={setValue}
          year={data.year}
          month={data.month}
          day={data.day}
        />
      </div>
    );
  }

  if (step === STEPS.THIRD) {
    bodyContent = (
      <div className="px-10 lg:px-20">
        <ThirdBody
          isEmail={isEmail}
          name={data.name}
          id={data.id}
          birth={data.birth}
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
          id={data.id}
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
          register={register}
          errors={errors}
          password={data.password}
        />
      </div>
    );
  }

  const clickHandler = () => {
    registerModal.onClose();
    loginModal.onOpen();
    setStep(STEPS.FIRST);
    reset();
  };

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
    <>
      {isLoading && (
        <div
          className=" 
            fixed 
            z-20 
            inset-0 
            flex
            justify-center 
            items-center 
            bg-neutral-800/70
          "
        >
          <div className="flex flex-col items-center">
            <ClipLoader color="lightblue" size={80} />
            <span className="text-white">Loading...</span>
          </div>
        </div>
      )}
      <Modal
        isOpen={registerModal.isOpen}
        onClose={step === STEPS.FIRST ? registerModal.onClose : onBack}
        icon={step === STEPS.FIRST ? IoClose : IoMdArrowBack}
        step={step}
        title={`5단계 중 ${step}단계`}
        body={bodyContent}
        footer={footerContent}
        reset={reset}
      />
    </>
  );
};

export default RegisterModal;
