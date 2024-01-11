import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface DropProps {
  userId: string;
  top?: boolean;
}

const Drop: React.FC<DropProps> = ({ userId, top }) => {
  return (
    <div
      className={`
        z-10
        py-3 
        rounded-2xl 
        absolute 
        w-[300px] 
        bg-white 
        ${top ? "bottom-20" : "top-14"}
        ${top ? "" : "-left-3"}
      `}
      style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
    >
      <div
        style={{
          borderTop: top ? "15px solid white" : "0px solid transparent",
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: top ? "0px solid transparent" : "15px solid white",
          position: "absolute",
          bottom: top ? "-10px" : "",
          top: top ? "" : "-10px",
          left: "22px",
          filter: top
            ? "drop-shadow(0 6px 4px rgba(0, 0, 0, 0.1))"
            : "drop-shadow(0 -6px 4px rgba(0, 0, 0, 0.1))",
        }}
      ></div>
      <button
        onClick={() => localStorage.removeItem("auth")}
        className="w-full text-start"
      >
        <Link
          to={`${axios.defaults.baseURL}/auth/logout`}
          className="block p-2 hover:bg-neutral-300/40 px-3"
        >
          <span className="font-bold">Log out @{userId}</span>
        </Link>
      </button>
    </div>
  );
};

export default Drop;
