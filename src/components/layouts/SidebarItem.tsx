import React from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: IconType;
  faIcon: IconType;
  label: string;
  href: string;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  faIcon: FaIcon,
  label,
  href,
  alert,
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
        relative
      "
    >
      {location.pathname === href ? <FaIcon size={32} /> : <Icon size={32} />}
      {alert ? (
        <BsDot className="text-sky-500 absolute -top-4 left-1" size={60} />
      ) : null}
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
