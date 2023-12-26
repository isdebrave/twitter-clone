import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import WritePostModal from "../components/modals/WritePostModal";
import ProfileModal from "../components/modals/ProfileModal";
import CommentModal from "../components/modals/CommentModal";

const Root = () => {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <WritePostModal />
      <ProfileModal />
      <CommentModal />
      <Outlet />
    </>
  );
};

export default Root;
