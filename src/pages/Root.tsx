import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import RegisterModal from "../components/registerModal/RegisterModal";
import LoginModal from "../components/loginModal/LoginModal";

const Root = () => {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <Outlet />
    </>
  );
};

export default Root;
