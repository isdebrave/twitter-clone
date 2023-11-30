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

const MobileNavbar = () => {
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
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="absolute left-0 bottom-0 w-full border-t">
      <div className="flex flex-row justify-between px-10 py-2">
        {items.map((item) => (
          <button key={item.href} onClick={() => navigate(item.href)}>
            {location.pathname === item.href ? (
              <item.faIcon size={32} />
            ) : (
              <item.icon size={32} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
