import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import WritePostModal from "../components/modals/WritePostModal";

const Root = () => {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <WritePostModal />
      <Outlet />
    </>
  );
};

export default Root;
