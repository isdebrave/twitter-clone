import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const SidebarLogo = () => {
  return (
    <Link
      to="/home"
      className="block p-3 rounded-full hover:bg-neutral-300/40 w-fit"
    >
      <BsTwitterX size={30} />
    </Link>
  );
};

export default SidebarLogo;
