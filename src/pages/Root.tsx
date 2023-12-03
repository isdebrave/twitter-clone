import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import PostFormModal from "../components/modals/PostFormModal";

const Root = () => {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <PostFormModal />
      <Outlet />
    </>
  );
};

export default Root;
