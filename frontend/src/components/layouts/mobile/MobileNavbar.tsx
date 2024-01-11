import React from "react";
import {
  GoHome,
  GoHomeFill,
  GoSearch,
  GoBell,
  GoBellFill,
} from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { PiUser, PiUserFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { BsDot } from "react-icons/bs";

import { RootState } from "../../../redux/store";

const MobileNavbar = () => {
  const me = useSelector((state: RootState) => state.me);

  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      icon: GoHome,
      faIcon: GoHomeFill,
      href: "/home",
    },
    {
      icon: GoSearch,
      faIcon: FaSearch,
      href: "/explore",
    },
    {
      icon: GoBell,
      faIcon: GoBellFill,
      href: "/notifications",
      alert: me.hasNotification,
    },
    {
      icon: PiUser,
      faIcon: PiUserFill,
      label: "Profile",
      href: `/${me.id}`,
    },
  ];

  return (
    <div className="fixed bg-white left-0 bottom-0 w-full border-t">
      <div className="flex flex-row justify-between px-10 py-2">
        {items.map((item) => (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className="relative"
          >
            {location.pathname === item.href ? (
              <item.faIcon size={32} />
            ) : (
              <item.icon size={32} />
            )}
            {item.alert ? (
              <BsDot
                className="text-sky-500 absolute -bottom-[1px] -left-2"
                size={60}
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
