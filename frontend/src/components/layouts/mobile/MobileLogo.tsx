import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const MobileLogo = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <Link
        to="/home"
        className="block p-3 rounded-full hover:bg-neutral-300/40 w-fit"
      >
        <BsTwitterX size={20} />
      </Link>
    </div>
  );
};

export default MobileLogo;
