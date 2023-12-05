import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart, BiMessageRounded, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import PostsProfileImage from "./PostsProfileImage";
import PostsItem from "./PostsItem";
import Icon from "../Icon";

import { PostState, fetchPostLiked } from "../../redux/reducers/post";
import { AppDispatch, RootState } from "../../redux/store";

interface PostsProps {
  posts: PostState[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const me = useSelector((state: RootState) => state.me);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const profileHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, href: string) => {
      e.stopPropagation();
      navigate(href);
    },
    [navigate]
  );

  const likedHandler = useCallback(
    (e: React.MouseEvent, postId: string) => {
      e.stopPropagation();

      if (postId) {
        dispatch(fetchPostLiked({ postId, meId: me.id, dispatch }));
      }
    },
    [dispatch, me.id]
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
          onClick={(e) =>
            profileHandler(e, `/${post.user.id}/status/${post.id}`)
          }
          className="cursor-pointer"
        >
          <div className="p-2 px-4 hover:bg-neutral-300/20">
            <div className="flex gap-3">
              <div onClick={(e) => profileHandler(e, `/${post.user.id}`)}>
                <PostsProfileImage profileImage={post.user.profileImage} />
              </div>

              <div className="flex-1">
                <PostsItem
                  onClick={(e) => profileHandler(e, `/${post.user.id}`)}
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
                    onClick={(e) => e && likedHandler(e, post.id)}
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
