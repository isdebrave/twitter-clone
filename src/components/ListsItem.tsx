import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNowStrict } from "date-fns";
import { IoEllipsisHorizontal, IoTrashSharp } from "react-icons/io5";
import axios from "axios";

import ImageCard from "./ImageCard";

import { stopPropagationHandler } from "../helpers/event";
import { src } from "../helpers/image";

import { AppDispatch, RootState } from "../redux/store";
import { onPostsCommentDelete, onPostsDelete } from "../redux/reducers/posts";
import {
  onProfilePostsCommentDelete,
  onProfilePostsDelete,
} from "../redux/reducers/profile";
import { onPostCommentDelete } from "../redux/reducers/post";

interface ListsItemProps {
  onClick: (e: React.MouseEvent) => void;
  username: string;
  userId: string;
  isPosts: boolean;
  postId: string;
  commentId?: string;
  createdAt: string;
  body: string;
  images: string[];
}

const ListsItem: React.FC<ListsItemProps> = ({
  onClick,
  username,
  userId,
  isPosts,
  postId,
  commentId,
  createdAt,
  body,
  images,
}) => {
  const [showBox, setShowBox] = useState(false);

  const me = useSelector((state: RootState) => state.me);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const onCloseBox = () => setShowBox(false);

    window.addEventListener("click", onCloseBox);

    return () => window.removeEventListener("click", onCloseBox);
  }, []);

  const deleteHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPosts) {
      axios.delete("/post", { data: { postId } });

      dispatch(onPostsDelete({ postId }));
      dispatch(onProfilePostsDelete({ postId }));
    } else {
      axios.delete(`/post/${postId}/comment`, { data: { commentId } });

      dispatch(onPostCommentDelete({ commentId }));
      dispatch(onPostsCommentDelete({ postId, commentId }));
      dispatch(onProfilePostsCommentDelete({ postId, commentId }));
    }
  };

  return (
    <>
      <div className="relative">
        <div className="space-x-2">
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={onClick}
          >
            {username}
          </span>
          <span className="text-gray-500">
            @{userId.slice(0, 10)} ▪{" "}
            {formatDistanceToNowStrict(new Date(createdAt))}
          </span>
        </div>

        {me.id === userId && (
          <>
            <div
              onClick={(e) => stopPropagationHandler(e, () => setShowBox(true))}
              className="
                absolute 
                -top-1 
                right-0
                p-2 
                rounded-full 
                text-gray-600 
                hover:text-sky-500 
                hover:bg-sky-100
                cursor-pointer
              "
            >
              <IoEllipsisHorizontal size={18} />
            </div>

            {showBox && (
              <div
                onClick={deleteHandler}
                className="
                  absolute
                  -top-1 
                  right-0
                  py-3 
                  px-2
                  rounded-xl 
                  bg-white 
                  text-red-500
                  flex
                  items-center
                  font-semibold
                  hover:bg-slate-100
                  w-[300px]
                  gap-2
                  cursor-pointer
                "
                style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)" }}
              >
                <IoTrashSharp size={18} />
                <span>Delete</span>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-gray-600 mb-2">{body}</p>

      {images.length > 0 && (
        <ImageCard
          onClick={(e) =>
            stopPropagationHandler(e, () =>
              navigate(`/${userId.slice(0, 10)}/status/${postId}/photo`)
            )
          }
          imagesCount={images.length}
        >
          {images.map((image, idx) => (
            <div
              key={image + idx}
              className={`
              w-full 
              flex
              ${images.length === 3 && idx === 0 && "row-span-2"}
            `}
            >
              <img
                src={src(image)}
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

export default ListsItem;
