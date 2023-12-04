import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart, BiMessageRounded, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PostsProfileImage from "./PostsProfileImage";
import PostsItem from "./PostsItem";
import Icon from "../Icon";

import { PostState, onPostLiked } from "../../redux/reducers/post";
import { onUpdatePosts } from "../../redux/reducers/posts";
import { RootState } from "../../redux/store";

interface PostsProps {
  posts: PostState[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const me = useSelector((state: RootState) => state.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, href: string) => {
      e.stopPropagation();
      navigate(href);
    },
    [navigate]
  );

  const likedHandler = useCallback(
    (e: React.MouseEvent, postId: string, userId: string) => {
      e.stopPropagation();

      axios
        .post("/post/liked", { postId })
        .then((res) => {
          dispatch(onPostLiked({ userId, status: res.data }));
          dispatch(onUpdatePosts());
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch]
  );

  const isHeartFill = useCallback((array: string[], meId: string) => {
    const idx = array.find((likedUserId) => likedUserId === meId);

    if (idx) {
      return true;
    } else {
      return false;
    }
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={(e) => linkHandler(e, `/${post.user.id}/status/${post.id}`)}
          className="cursor-pointer"
        >
          <div className="p-2 px-4 hover:bg-neutral-300/20">
            <div className="flex gap-3">
              <div onClick={(e) => linkHandler(e, `/${post.user.id}`)}>
                <PostsProfileImage profileImage={post.user.profileImage} />
              </div>

              <div className="flex-1">
                <PostsItem
                  onClick={(e) => linkHandler(e, `/${post.user.id}`)}
                  username={post.user.username}
                  userId={post.user.id.slice(0, 10)}
                  createdAt={post.createdAt}
                  body={post.body}
                  images={post.images}
                />

                <div className="flex gap-10">
                  <Icon
                    onClick={() => {}}
                    icon={BiMessageRounded}
                    length={post.comments.length}
                    groupTextHoverColor="group-hover:text-sky-500"
                    groupBgHoverColor="group-hover:bg-sky-200/40"
                    textColor="text-gray-500"
                  />
                  <Icon
                    onClick={(e) => e && likedHandler(e, post.id, post.user.id)}
                    icon={
                      isHeartFill(post.likedIds, me.id) ? BiSolidHeart : BiHeart
                    }
                    length={post.likedIds.length}
                    groupTextHoverColor="group-hover:text-rose-500"
                    groupBgHoverColor="group-hover:bg-rose-200/40"
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
