import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ImageCard from "../ImageCard";
import { RootState } from "../../redux/store";
import useCommentModal from "../../hooks/useCommentModal";

interface PostBodyProps {
  body: string;
  imagesCount: number;
  images: string[];
  imagesHeight?: string;
}

const PostBody: React.FC<PostBodyProps> = ({
  body,
  imagesCount,
  images,
  imagesHeight = "",
}) => {
  const navigate = useNavigate();
  const post = useSelector((state: RootState) => state.post);
  const commentModal = useCommentModal();

  const carouselHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (post) {
      const url = `/${post.user.id}/status/${post.id}/photo`;
      return navigate(url);
    }

    if (commentModal.post) {
      const url = `/${commentModal.post.user.id}/status/${commentModal.post.id}/photo`;
      return navigate(url);
    }
  };

  return (
    <>
      <p className="text-gray-600 mb-3">{body}</p>
      {images.length > 0 && (
        <ImageCard onClick={carouselHandler} imagesCount={imagesCount}>
          {images.map((src, idx) => (
            <div
              key={src + idx}
              className={`
                w-full 
                ${imagesHeight.length > 0 ? imagesHeight : "h-full"}
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
