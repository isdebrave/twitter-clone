import axios from "axios";
import React, { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import ImageCard from "../ImageCard";

interface PostsItemProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  username: string;
  userId: string;
  createdAt: string;
  body: string;
  images: string[];
}

const PostsItem: React.FC<PostsItemProps> = ({
  onClick,
  username,
  userId,
  createdAt,
  body,
  images,
}) => {
  const customizedCreatedAt = useMemo(
    () => formatDistanceToNowStrict(new Date(createdAt)),
    [createdAt]
  );

  return (
    <>
      <div className="space-x-2">
        <span className="font-bold hover:underline" onClick={onClick}>
          {username}
        </span>
        <span className="text-gray-500">
          @{userId} ▪ {customizedCreatedAt}
        </span>
      </div>

      <p className="text-gray-600 mb-2">{body}</p>
      {images.length > 0 && (
        <ImageCard imagesLength={images.length}>
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

export default PostsItem;
