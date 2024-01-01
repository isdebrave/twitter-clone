import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import ProfileModal from "../components/modals/ProfileModal";
import WritePostModal from "../components/modals/WritePostModal";
import WriteCommentModal from "../components/modals/WriteCommentModal";

import useMe from "../hooks/useMe";

import { onMe } from "../redux/reducers/me";

const Root = () => {
  const { data } = useMe();

  const dispatch = useDispatch();

  if (data === undefined) return;

  if (data) {
    localStorage.setItem("auth", "true");
    dispatch(onMe(data));
  } else {
    localStorage.removeItem("auth");
  }

  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <ProfileModal />
      <WritePostModal />
      <WriteCommentModal />
      <Outlet />
    </>
  );
};

export default Root;
