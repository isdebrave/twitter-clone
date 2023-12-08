import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiHeart, BiSolidHeart, BiMessageRounded } from "react-icons/bi";

import MainHeading from "../components/MainHeading";
import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";
import Icon from "../components/Icon";

import { RootState } from "../redux/store";
import usePost from "../hooks/usePost";

const Feed = () => {
  const { post, likedHandler } = usePost();
  const me = useSelector((state: RootState) => state.me);
  const navigate = useNavigate();

  // 사용자가 임의로 userId 변경해도 원상태로 돌리는 방법
  // useEffect(() => {
  //   if (post.user.id !== "" && post.user.id !== userId) {
  //     window.location.replace(`/${post.user.id}/status/${postId}`);
  //   }
  // }, [navigate, userId, post.user.id, postId]);

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

export default Feed;
