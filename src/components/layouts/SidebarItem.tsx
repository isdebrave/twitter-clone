import React from "react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: IconType;
  faIcon: IconType;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  faIcon: FaIcon,
  label,
  href,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      onClick={() => navigate(href)}
      className="
        p-3 
        rounded-full 
        hover:bg-neutral-300/40 
        w-fit 
        cursor-pointer 
        flex 
        items-center 
        gap-4 
        text-xl
      "
    >
      {location.pathname === href ? <FaIcon size={32} /> : <Icon size={32} />}
      <span
        className={`
          hidden 
          lg:block
          ${location.pathname === href && "font-bold"}
        `}
      >
        {label}
      </span>
    </button>
  );
};

export default SidebarItem;
