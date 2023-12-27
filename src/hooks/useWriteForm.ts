import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const useWriteForm = () => {
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { body: "" } });

  const watchAllFields = watch();

  const resetAll = () => {
    setImagesPreview([]);
    setImageFiles([]);

    for (const key in watchAllFields) {
      clearErrors(key);
      setValue(key, "");
    }
  };

  const onSubmit = async (props: {
    data: FieldValues;
    fetchUrl: string;
    actionArray: ActionCreatorWithPayload<any>[];
    onClose?: () => void;
    postId?: string;
  }) => {
    const { data, fetchUrl, actionArray, onClose, postId } = props;

    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("bodyImages", file);
    }
    formData.append("body", data.body);
    postId && formData.append("postId", postId);

    try {
      const response = await axios.post(fetchUrl, formData);

      actionArray.forEach((action) => dispatch(action(response.data)));

      onClose && onClose();

      resetAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    const textarea = document.querySelector("textarea")!;
    textarea.style.height = "auto";

    const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
    textarea.style.maxHeight = "450px";
    textarea.style.height = scrollHeight + "px";
  };

  return {
    imagesInputRef,
    imagesPreview,
    setImagesPreview,
    imageFiles,
    setImageFiles,
    register,
    handleSubmit,
    keyDownHandler,
    onSubmit,
    resetAll,
  };
};

export default useWriteForm;
