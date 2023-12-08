import axios, { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import useWritePostForm from "../hooks/useWritePostForm";

import { AppDispatch } from "../redux/store";
import { fetchPosts } from "../redux/thunk/posts";

const WritePost = () => {
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
      // dispatch(fetchWritePost(formData));
      dispatch(fetchPosts());
      resetAll();
    } catch (error: unknown) {
      console.log(error);
      // if (error instanceof AxiosError) {
      //   console.log(error);
      //   toast.error(error?.response?.data);
      // }
    } finally {
      setIsLoading(false);
    }
  };

  const { resetAll, imageFiles, bodyContent, footerContent } = useWritePostForm(
    onSubmit,
    showDivision
  );

  return (
    <>
      {bodyContent}
      {footerContent}
    </>
  );
};

export default WritePost;
