import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiHeart, BiSolidHeart, BiMessageRounded } from "react-icons/bi";

import MainHeading from "../components/MainHeading";
import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";
import Icon from "../components/Icon";

import { AppDispatch, RootState } from "../redux/store";
import { fetchPost, fetchPostLiked } from "../redux/reducers/post";

const Feed = () => {
  const post = useSelector((state: RootState) => state.post);
  const me = useSelector((state: RootState) => state.me);
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (post.user.id !== "" && post.user.id !== userId) {
      navigate(`/${post.user.id}/status/${postId}`);
    }
  }, [post.user, navigate, userId, postId]);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost({ postId, navigate }));
    }
  }, [dispatch, postId, navigate]);

  const likedHandler = useCallback(() => {
    if (postId) {
      dispatch(fetchPostLiked({ postId, meId: me.id, dispatch }));
    }
  }, [dispatch, me.id, postId]);

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
      <MainHeading title="Post" onClick={() => navigate(-1)} />
      <div className="p-3 px-4">
        <div className="mb-3">
          <PostProfile
            href={`/${post.user.id}`}
            profileImage={post.user.profileImage}
            username={post.user.username}
            userId={post.user.id.slice(0, 10)}
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
            groupTextHoverColor="group-hover:text-sky-500"
            groupBgHoverColor="group-hover:bg-sky-200/40"
            textColor="text-gray-500"
          />
          <Icon
            onClick={likedHandler}
            icon={isHeartFill(post.likedIds, me.id) ? BiSolidHeart : BiHeart}
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
        <hr className="mt-1 mb-3" />
      </div>
    </>
  );
};

export default memo(Feed);
