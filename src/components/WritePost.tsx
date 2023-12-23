import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import useWritePostForm from "../hooks/useWritePostForm";

import { onPostsAdd } from "../redux/reducers/posts";
import { onProfilePostsAdd } from "../redux/reducers/profile";

const WritePost = () => {
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("bodyImages", file);
    }
    formData.append("body", data.body);

    try {
      const response = await axios.post("/post", formData);

      dispatch(onPostsAdd(response.data));
      dispatch(onProfilePostsAdd(response.data));

      resetAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data);
      }
    }
  };

  const { resetAll, imageFiles, bodyContent, footerContent } = useWritePostForm(
    onSubmit,
    false
  );

  return (
    <>
      {bodyContent}
      {footerContent}
    </>
  );
};

export default WritePost;
