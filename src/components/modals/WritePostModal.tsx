import React, { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Modal from "./Modal";

import useWritePostForm from "../../hooks/useWritePostForm";

import { AppDispatch, RootState } from "../../redux/store";
import { onWritePostModalClose } from "../../redux/reducers/writePostModal";
import { fetchPosts } from "../../redux/thunk/posts";
import { fetchProfile } from "../../redux/thunk/profile";
import { fetchWritePost } from "../../redux/thunk/post";

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
    setIsLoading(true);
    await dispatch(fetchWritePost({ body: data.body, imageFiles }));
    dispatch(fetchPosts());
    if (userId) {
      userId === me.id && dispatch(fetchProfile({ userId, navigate }));
    }
    dispatch(onWritePostModalClose());
    resetAll();
    setIsLoading(false);
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
