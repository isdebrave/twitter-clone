import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import ProfileModal from "../components/modals/ProfileModal";
import WritePostModal from "../components/modals/WritePostModal";
import WriteCommentModal from "../components/modals/WriteCommentModal";

import useMe from "../hooks/useMe";

import { RootState } from "../redux/store";
import { onMe } from "../redux/reducers/me";

const Root = () => {
  const { data } = useMe();

  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    if (me.id.length === 0) {
      dispatch(onMe(data));
    }
  }, [data, dispatch, me.id.length]);

  if (data === undefined) return;

  if (data) {
    localStorage.setItem("auth", "true");
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
