import axios, { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import usePostForm from "../hooks/usePostForm";

import { fetchPosts } from "../redux/reducers/posts";
import { AppDispatch } from "../redux/store";

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showDivision = false;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      for (const file of imageFiles) {
        formData.append("bodyImages", file);
      }
      formData.append("body", data.body);

      await axios.post("/post", formData);
      dispatch(fetchPosts());
      resetAll();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const {
    reset,
    imagesPreview,
    setImagesPreview,
    imageFiles,
    setImageFiles,
    bodyContent,
    footerContent,
  } = usePostForm(onSubmit, showDivision);

  const resetAll = useCallback(() => {
    reset();
    setImagesPreview([]);
    setImageFiles([]);
  }, [reset, setImagesPreview, setImageFiles]);

  return (
    <>
      {bodyContent}
      {footerContent}
    </>
  );
};

export default PostForm;
