import React from "react";
import axios from "axios";

import ImageCard from "../ImageCard";

interface PostBodyProps {
  body: string;
  imagesLength: number;
  images: string[];
}

const PostBody: React.FC<PostBodyProps> = ({ body, imagesLength, images }) => {
  return (
    <>
      <p className="text-gray-600 mb-3">{body}</p>
      {images.length > 0 && (
        <ImageCard imagesLength={imagesLength}>
          {images.map((src, idx) => (
            <div
              key={src + idx}
              className={`
                w-full 
                flex
                ${images.length === 3 && idx === 0 && "row-span-2"}
              `}
            >
              <img
                src={`${axios.defaults.baseURL}/${src}`}
                alt="BodyImage"
                className="w-full object-cover"
              />
            </div>
          ))}
        </ImageCard>
      )}
    </>
  );
};

export default PostBody;
