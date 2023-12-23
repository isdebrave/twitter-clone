import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiHeart, BiSolidHeart, BiMessageRounded } from "react-icons/bi";
import axios from "axios";

import MainHeading from "../components/MainHeading";
import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";
import Icon from "../components/Icon";

import { RootState } from "../redux/store";
import { onPost, onPostViews } from "../redux/reducers/post";

import usePost from "../hooks/usePost";
import useLiked from "../hooks/useLiked";

const Feed = () => {
  const { data } = usePost();
  const { likedHandler } = useLiked();

  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 사용자가 임의로 userId 변경해도 원상태로 돌리는 방법
  // useEffect(() => {
  //   if (post.user.id !== "" && post.user.id !== userId) {
  //     window.location.replace(`/${post.user.id}/status/${postId}`);
  //   }
  // }, [navigate, userId, post.user.id, postId]);

  useEffect(() => {
    if (!data) return;

    if (post.id !== data.id) {
      dispatch(onPost(data));
    }
  }, [post, data, dispatch]);

  useEffect(() => {
    if (!data) return;

    axios.post("/post/views", { postId: data.id });
    dispatch(onPostViews());
  }, [dispatch, data]);

  const isHeartFill = (array: string[], meId: string) => {
    if (array.includes(meId)) {
      return true;
    }

    return false;
  };

  return (
    <>
      <MainHeading title="Post" onClick={() => navigate(-1)} />
      <div className="p-3 px-4">
        <div className="mb-3">
          <PostProfile
            href={`/${post.user.id}`}
            profileImage={post.user.profileImage}
            username={post.user.username}
            userId={post.user.id}
          />
        </div>
        <div className="mb-3">
          <PostBody
            body={post.body}
            imagesLength={post.images.length}
            images={post.images}
          />
        </div>
        <PostFooter createdAt={post.createdAt} views={post.views} />
        <hr className="mt-3 mb-1" />
        <div className="flex justify-around">
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
            icon={isHeartFill(post.likedIds, me.id) ? BiSolidHeart : BiHeart}
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
        <hr className="mt-1 mb-3" />
      </div>
    </>
  );
};

export default Feed;
