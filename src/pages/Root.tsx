import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import PostModal from "../components/modals/PostModal";

const Root = () => {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <PostModal />
      <Outlet />
    </>
  );
};

export default Root;
