import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

import Modal from "./Modal";

import useWritePostForm from "../../hooks/useWritePostForm";
import useWritePostModal from "../../hooks/useWritePostModal";

import { onPostsAdd } from "../../redux/reducers/posts";
import { onProfilePostsAdd } from "../../redux/reducers/profile";

const WritePostModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const writePostModal = useWritePostModal();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("bodyImages", file);
    }
    formData.append("body", data.body);

    try {
      setIsLoading(true);

      // async 말고 react-hook-form에서 바로 가져오기
      const response = await axios.post("/post", formData);

      dispatch(onPostsAdd(response.data));
      dispatch(onProfilePostsAdd(response.data));

      writePostModal.onClose();
      resetAll();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { resetAll, imageFiles, bodyContent, footerContent } = useWritePostForm(
    onSubmit,
    true
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={writePostModal.isOpen}
      onClose={writePostModal.onClose}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default WritePostModal;
