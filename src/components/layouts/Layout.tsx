import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import Sidebar from "./Sidebar";
import Followbar from "./Followbar";

import MobileProfile from "./mobile/MobileProfile";
import MobileLogo from "./mobile/MobileLogo";
import MobilePostButton from "./mobile/MobilePostButton";
import MobileNavbar from "./mobile/MobileNavbar";

import { onMeSave } from "../../redux/reducers/me";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/user/me")
      .then((res) => {
        if (res.data) {
          dispatch(onMeSave(res.data));
        } else {
          localStorage.removeItem("auth");
          navigate("/auth");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, navigate]);

  return (
    <div
      className="
        h-full 
        sm:grid 
        sm:grid-cols-3 
        lg:grid-cols-4 
        lg:px-24 
        relative
      "
    >
      <div
        className="
          hidden 
          h-full 
          sm:block 
          sm:col-span-1 
          sm:justify-self-end 
          sm:w-[88px] 
          lg:w-[300px] 
          border-r
        "
      >
        <Sidebar />
      </div>
      <div className="sm:hidden flex items-center py-3 px-6 relative">
        <MobileProfile />
        <MobileLogo />
      </div>
      <div className="sm:col-span-2 sm:border-r">{children}</div>
      <div className="hidden lg:block lg:col-span-1 w-[350px]">
        <Followbar />
      </div>
      <div className="sm:hidden">
        <MobilePostButton />
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Layout;
