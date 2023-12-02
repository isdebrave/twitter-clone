import axios from "axios";
import React, { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import ImageCard from "../ImageCard";

interface FeedItemProps {
  username: string;
  createdAt: string;
  body: string;
  images: string[];
}

const FeedItem: React.FC<FeedItemProps> = ({
  username,
  createdAt,
  body,
  images,
}) => {
  createdAt = useMemo(
    () => formatDistanceToNowStrict(new Date(createdAt)),
    [createdAt]
  );

  return (
    <>
      <div className="space-x-2">
        <span className="font-bold">{username}</span>
        <span className="text-gray-500">
          @{username} ▪ {createdAt}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{body}</p>
      <ImageCard length={images.length}>
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
    </>
  );
};

export default FeedItem;
