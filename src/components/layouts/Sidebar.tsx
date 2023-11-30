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

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarProfile from "./SidebarProfile";
import SidebarPostButton from "./SidebarPostButton";

const Sidebar = () => {
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
    },
    {
      icon: PiUser,
      faIcon: PiUserFill,
      label: "Profile",
      href: "/profile",
    },
  ];

  return (
    <div
      className="
        col-span-1 
        justify-self-end
        flex 
        flex-col 
        justify-between 
        border-r 
        px-3
        py-2 
        lg:w-[300px]
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
