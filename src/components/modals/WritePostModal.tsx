import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "./Modal";

import useWritePostForm from "../../hooks/useWritePostForm";

import { AppDispatch, RootState } from "../../redux/store";
import { onWritePostModalClose } from "../../redux/reducers/WritePostModal";
import { fetchPosts } from "../../redux/thunk/posts";
import { fetchProfile } from "../../redux/thunk/profile";

const WritePostModal = () => {
  const me = useSelector((state: RootState) => state.me);
  const writePostModal = useSelector(
    (state: RootState) => state.writePostModal
  );
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const showDivision = true;

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
      if (userId) {
        userId === me.id && dispatch(fetchProfile({ userId, navigate }));
      }
      dispatch(onWritePostModalClose());
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

  const { resetAll, imageFiles, bodyContent, footerContent } = useWritePostForm(
    onSubmit,
    showDivision
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={writePostModal.isOpen}
      onClose={() => dispatch(onWritePostModalClose())}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default WritePostModal;
