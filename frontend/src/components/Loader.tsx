import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  size: number;
  fixed?: boolean;
  absolute?: boolean;
  text?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size, fixed, absolute, text }) => {
  return (
    <div
      className={`
        ${fixed && "fixed"}
        ${fixed && "inset-0"}
        ${fixed && "bg-neutral-800/70"}
        ${absolute && "absolute"}
        ${absolute && "h-full"}
        z-50
        w-full
        flex
        flex-col
        justify-center 
        items-center 
      `}
    >
      <ClipLoader color="lightblue" size={size} />
      {text && <span className={`${fixed && "text-white"}`}>Loading...</span>}
    </div>
  );
};

export default Loader;
