import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import ProfileModal from "../components/modals/ProfileModal";
import WritePostModal from "../components/modals/WritePostModal";
import WriteCommentModal from "../components/modals/WriteCommentModal";

const Root = () => {
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
