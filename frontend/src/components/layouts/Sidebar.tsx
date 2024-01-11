import React from "react";
import {
  GoHome,
  GoHomeFill,
  GoSearch,
  GoBell,
  GoBellFill,
} from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { PiUser, PiUserFill } from "react-icons/pi";
import { useSelector } from "react-redux";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";
import SidebarPostButton from "./SidebarPostButton";

import { RootState } from "../../redux/store";

const Sidebar = () => {
  const me = useSelector((state: RootState) => state.me);

  const items = [
    {
      icon: GoHome,
      faIcon: GoHomeFill,
      label: "Home",
      href: "/home",
    },
    {
      icon: GoSearch,
      faIcon: FaSearch,
      label: "Explore",
      href: "/explore",
    },
    {
      icon: GoBell,
      faIcon: GoBellFill,
      label: "Notifications",
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
    <div
      className="
        z-10
        sm:fixed
        sm:w-[88px] 
        lg:w-[300px]
        h-full
        flex 
        flex-col 
        justify-between 
        px-3
        py-2 
      "
    >
      <div className="lg:pr-8 space-y-2">
        <SidebarLogo />
        <div>
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              faIcon={item.faIcon}
              label={item.label}
              href={item.href}
              alert={item.alert}
            />
          ))}
        </div>
        <SidebarPostButton />
      </div>

      <div className="lg:pr-2">
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Sidebar;
