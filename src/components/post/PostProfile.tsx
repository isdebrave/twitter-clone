import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisHorizontal, IoTrashSharp } from "react-icons/io5";

import {
  clickDispatchHandler,
  clickSetFunctionHandler,
} from "../../helpers/click";
import { src } from "../../helpers/image";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchDeletePost } from "../../redux/thunk/post";

interface PostProfile {
  href: string;
  profileImage: string;
  username: string;
  userId: string;
}

const PostProfile: React.FC<PostProfile> = ({
  href,
  profileImage,
  username,
  userId,
}) => {
  const [showBox, setShowBox] = useState(false);

  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const onCloseBox = () => setShowBox(false);

    window.addEventListener("click", onCloseBox);
    return () => window.removeEventListener("click", onCloseBox);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Link to={href}>
        <div
          className="
            w-[40px] 
            h-[40px] 
            rounded-full 
            overflow-hidden 
            hover:brightness-90 
            transition
          "
        >
          <img src={src(profileImage)} alt="ProfileImage" className="w-full" />
        </div>
      </Link>

      <div className="flex flex-col flex-auto relative">
        <Link to={href}>
          <span className="font-bold hover:underline">{username}</span>
        </Link>
        <span className="text-gray-500">@{userId.slice(0, 10)}</span>

        {me.id === userId && (
          <>
            <div
              onClick={(e) =>
                clickSetFunctionHandler<boolean>(e, setShowBox, true)
              }
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
                onClick={(e) =>
                  clickDispatchHandler(e, dispatch, fetchDeletePost, {
                    postId: post.id,
                    dispatch,
                    navigate,
                  })
                }
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
    </div>
  );
};

export default PostProfile;
