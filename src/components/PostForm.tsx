import axios, { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import usePostForm from "../hooks/usePostForm";

import { onAddPostToPosts } from "../redux/reducers/posts";

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showDivision = false;
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      for (const file of imageFiles) {
        formData.append("bodyImages", file);
      }
      formData.append("body", data.body);

      const response = await axios.post("/post", formData);
      dispatch(onAddPostToPosts(response.data));
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
