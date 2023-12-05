import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "./Modal";

import usePostForm from "../../hooks/usePostForm";

import { AppDispatch, RootState } from "../../redux/store";
import { onPostFormModalClose } from "../../redux/reducers/postFormModal";
import { fetchPosts } from "../../redux/reducers/posts";
import { fetchProfile } from "../../redux/reducers/profile";

const PostFormModal = () => {
  const me = useSelector((state: RootState) => state.me);
  const postFormModal = useSelector((state: RootState) => state.postFormModal);
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
      userId === me.id && dispatch(fetchProfile({ userId, navigate }));
      dispatch(onPostFormModalClose());
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
    <Modal
      disabled={isLoading}
      isOpen={postFormModal.isOpen}
      onClose={() => dispatch(onPostFormModalClose())}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default PostFormModal;
