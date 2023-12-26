import React from "react";

interface ImageCardProps {
  onClick: (e: React.MouseEvent) => void;
  imagesCount: number;
  children: React.ReactElement[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  onClick,
  imagesCount,
  children,
}) => {
  if (imagesCount === 1 || imagesCount === 2) {
    return (
      <div
        onClick={onClick}
        className={`
          ${imagesCount === 2 && "h-[280px]"}
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
