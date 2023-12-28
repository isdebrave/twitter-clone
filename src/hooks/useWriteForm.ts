import React, { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const useWriteForm = (
  defaultValues: FieldValues,
  method: "POST" | "PATCH" = "POST"
) => {
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>();

  const watchAllFields = watch();

  useEffect(() => {
    if (defaultValues.username === watchAllFields.username) return;

    for (const key in defaultValues) {
      setValue(key, defaultValues[key]);
    }
  }, [defaultValues, watchAllFields, setValue]);

  const resetAll = () => {
    setImagesPreview([]);
    setImageFiles([]);

    setCoverImagePreview("");
    setCoverImage(null);
    setProfileImagePreview("");
    setProfileImage(null);

    for (const key in defaultValues) {
      clearErrors(key);
      setValue(key, defaultValues[key]);
    }
  };

  const onSubmit = async (props: {
    data: FieldValues;
    fetchUrl: string;
    actionArray: Array<
      (data?: AxiosResponse<any>) => { payload: any; type: any }
    >;
    onClose?: () => void;
    postId?: string;
    profileId?: string;
  }) => {
    const { data, fetchUrl, actionArray, onClose, postId } = props;

    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("bodyImages", file);
    }
    postId && formData.append("postId", postId);
    coverImage && formData.append("coverImage", coverImage);
    profileImage && formData.append("profileImage", profileImage);
    formData.append("data", JSON.stringify(data));

    try {
      if (method === "POST") {
        // 더미 데이터
        actionArray.forEach((action) => dispatch(action()));

        resetAll();
        onClose && onClose();

        // 실제 데이터
        const response = await axios.post(fetchUrl, formData);

        actionArray.forEach((action) => dispatch(action(response.data)));
      } else {
        axios.patch(fetchUrl, formData);

        actionArray.forEach((action) => dispatch(action()));

        resetAll();
        onClose && onClose();
      }
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
    coverImageInputRef,

    imagesPreview,
    setImagesPreview,
    imageFiles,
    setImageFiles,

    coverImagePreview,
    setCoverImagePreview,
    profileImagePreview,
    setProfileImagePreview,
    coverImage,
    setCoverImage,
    profileImage,
    setProfileImage,

    register,
    errors,
    handleSubmit,
    keyDownHandler,
    onSubmit,
    resetAll,
    watchAllFields,
  };
};

export default useWriteForm;
