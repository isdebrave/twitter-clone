import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart, BiMessageRounded, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import PostsItem from "./PostsItem";
import Icon from "../Icon";

import {
  clickDispatchHandler,
  clickNavigateHandler,
} from "../../helpers/click";
import { src } from "../../helpers/image";

import { AppDispatch, RootState } from "../../redux/store";
import { PostState } from "../../redux/reducers/post";
import { fetchPostLiked } from "../../redux/thunk/post";
import useLiked from "../../hooks/useLiked";

interface PostsProps {
  posts: PostState[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const me = useSelector((state: RootState) => state.me);
  const { likedHandler } = useLiked();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isHeartFill = (array: string[], meId: string) => {
    if (array.includes(meId)) {
      return true;
    }

    return false;
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={(e) =>
            clickNavigateHandler(
              e,
              navigate,
              `/${post.user.id}/status/${post.id}`
            )
          }
          className="cursor-pointer"
        >
          <div className="p-3 px-4 hover:bg-neutral-300/20">
            <div className="flex gap-3">
              <div
                onClick={(e) =>
                  clickNavigateHandler(e, navigate, `/${post.user.id}`)
                }
                className="
                  w-[40px] 
                  h-[40px] 
                  rounded-full 
                  overflow-hidden 
                  hover:brightness-90 
                  transition
                "
              >
                <img
                  src={src(post.user.profileImage)}
                  alt="ProfileImage"
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <PostsItem
                  onClick={(e) =>
                    clickNavigateHandler(e, navigate, `/${post.user.id}`)
                  }
                  username={post.user.username}
                  userId={post.user.id}
                  postId={post.id}
                  createdAt={post.createdAt}
                  body={post.body}
                  images={post.images}
                />

                <div className="flex gap-10">
                  <Icon
                    onClick={() => {}}
                    icon={BiMessageRounded}
                    length={post.comments.length}
                    textHover="group-hover:text-sky-500"
                    bgHover="group-hover:bg-sky-200/40"
                    textColor="text-gray-500"
                  />
                  <Icon
                    onClick={(e) => likedHandler(e, post.id)}
                    icon={
                      isHeartFill(post.likedIds, me.id) ? BiSolidHeart : BiHeart
                    }
                    length={post.likedIds.length}
                    textHover="group-hover:text-rose-500"
                    bgHover="group-hover:bg-rose-200/40"
                    textColor={
                      isHeartFill(post.likedIds, me.id)
                        ? "text-rose-500"
                        : "text-gray-500"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
