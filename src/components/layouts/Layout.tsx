import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useMe from "../../hooks/useMe";
import Sidebar from "./Sidebar";
import MobileProfile from "./mobile/MobileProfile";
import MobileLogo from "./mobile/MobileLogo";
import MobilePostButton from "./mobile/MobilePostButton";
import MobileNavbar from "./mobile/MobileNavbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const me = useMe();

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => {
        if (res.data) {
          me.onValue(res.data);
        } else {
          navigate("/auth");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* desktop */}
      <div className="hidden sm:block h-full">
        <div className="grid grid-cols-3 lg:grid-cols-4 h-full lg:px-24">
          <Sidebar />
          <div className="col-span-2 border-r">{children}</div>
          <div className="col-span-1 hidden lg:block">3</div>
        </div>
      </div>

      {/* mobile */}
      <div className="sm:hidden h-full relative">
        <div className="flex items-center py-3 px-6 relative">
          <MobileProfile />
          <MobileLogo />
        </div>
        {children}
        <MobilePostButton />
        <MobileNavbar />
      </div>
    </>
  );
};

export default Layout;
