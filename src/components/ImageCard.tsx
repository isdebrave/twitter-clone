import React from "react";

interface ImageCardProps {
  imagesLength: number;
  children: React.ReactElement[];
}

const ImageCard: React.FC<ImageCardProps> = ({ imagesLength, children }) => {
  if (imagesLength === 1 || imagesLength === 2) {
    return (
      <div
        className={`
          ${imagesLength === 2 && "h-[280px]"}
          flex 
          gap-1 
          border 
          rounded-2xl 
          overflow-hidden 
          border-slate-300
        `}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="
        h-[280px] 
        grid 
        grid-rows-2 
        grid-flow-col 
        gap-1 
        border
        rounded-2xl 
        overflow-hidden 
        border-slate-300
      "
    >
      {children}
    </div>
  );
};

export default ImageCard;
