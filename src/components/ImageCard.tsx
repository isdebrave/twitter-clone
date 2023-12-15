import React from "react";

interface ImageCardProps {
  onClick: (e: React.MouseEvent) => void;
  imagesLength: number;
  children: React.ReactElement[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  onClick,
  imagesLength,
  children,
}) => {
  if (imagesLength === 1 || imagesLength === 2) {
    return (
      <div
        onClick={onClick}
        className={`
          ${imagesLength === 2 && "h-[280px]"}
          flex 
          gap-1 
          border 
          rounded-2xl 
          overflow-hidden 
          border-slate-300
          hover:bg-sky-100
          cursor-pointer
        `}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
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
        hover:bg-sky-100
        cursor-pointer
      "
    >
      {children}
    </div>
  );
};

export default ImageCard;
