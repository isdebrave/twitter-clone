import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import WritePostFormBody from "../components/writePostForm/WritePostFormBody";

import { RootState } from "../redux/store";
import WritePostFormFooter from "../components/writePostForm/WritePostFormFooter";

const useWritePostForm = (
  onSubmit: SubmitHandler<FieldValues>,
  showDivision: boolean
) => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const me = useSelector((state: RootState) => state.me);

  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: { body: "" },
  });

  const resetAll = () => {
    reset();
    setImagesPreview([]);
    setImageFiles([]);
  };

  return {
    resetAll,
    imageFiles,
    bodyContent: (
      <WritePostFormBody
        me={me}
        register={register}
        showDivision={showDivision}
      />
    ),
    footerContent: (
      <WritePostFormFooter
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        imagesPreview={imagesPreview}
        setImagesPreview={setImagesPreview}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
      />
    ),
  };
};

export default useWritePostForm;
