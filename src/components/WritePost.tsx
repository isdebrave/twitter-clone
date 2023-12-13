import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

import useWritePostForm from "../hooks/useWritePostForm";

import { AppDispatch } from "../redux/store";
import { fetchPosts } from "../redux/thunk/posts";
import { fetchWritePost } from "../redux/thunk/post";

const WritePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showDivision = false;
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await dispatch(fetchWritePost({ body: data.body, imageFiles }));
    dispatch(fetchPosts());
    resetAll();
    setIsLoading(false);
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
