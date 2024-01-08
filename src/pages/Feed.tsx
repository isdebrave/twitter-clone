import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiHeart, BiSolidHeart, BiMessageRounded } from "react-icons/bi";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import MainHeading from "../components/MainHeading";
import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";
import Icon from "../components/Icon";
import WriteComment from "../components/WriteComment";
import Lists from "../components/Lists";

import { RootState } from "../redux/store";
import { onPost, onPostComments, onPostViews } from "../redux/reducers/post";

import usePost from "../hooks/usePost";
import useLiked from "../hooks/useLiked";
import useCommentModal from "../hooks/useCommentModal";
import useLists from "../hooks/useLists";
import useCommentPageIndex from "../hooks/useCommentPageIndex";

const Feed = () => {
  const [isEnter, setIsEnter] = useState(false);
  const { postId } = useParams();

  const { data } = usePost();
  const { likedHandler } = useLiked();
  const commentModal = useCommentModal();

  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);

  const commentPageIndex = useCommentPageIndex();
  const pageIndexPlus = commentPageIndex.onPlus;
  const {
    data: listsData,
    isValidating,
    mutate,
    hasMoreData,
  } = useLists({
    pathname: `/post/${postId}/comment/all`,
    category: "COMMENT",
  });

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
      commentModal.onPost(data);
    }
  }, [post, data, dispatch, commentModal]);

  useEffect(() => {
    if (!data) return;

    axios.post("/post/views", { postId: data.id });
    dispatch(onPostViews());
  }, [dispatch, data]);

  useEffect(() => {
    if (hasMoreData && post.comments.length === 0) {
      setIsEnter(true);
    }
  }, [post.comments.length, hasMoreData]);

  useEffect(() => {
    if (!listsData) return;

    if (hasMoreData && isEnter) {
      mutate()
        .then((data) => {
          dispatch(onPostComments(data));
          setIsEnter(false);
          pageIndexPlus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEnter, mutate, listsData, dispatch, hasMoreData, pageIndexPlus]);

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
            imagesCount={post.images.length}
            images={post.images}
          />
        </div>
        <PostFooter createdAt={post.createdAt} views={post.views} />
        <hr className="mt-3 mb-1" />
        <div className="flex justify-around">
          <Icon
            onClick={commentModal.onOpen}
            icon={BiMessageRounded}
            length={post.comments.length}
            textHover="group-hover:text-sky-500"
            bgHover="group-hover:bg-sky-200/40"
            textColor="text-gray-500"
          />
          <Icon
            onClick={() => likedHandler(post)}
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
        <WriteComment />
        <hr className="my-3" />
        {hasMoreData && post.comments.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center">
            <ClipLoader color="lightblue" size={80} />
            <span>Loading...</span>
          </div>
        ) : (
          <Lists
            lists={post.comments}
            isValidating={isValidating}
            isEnter={isEnter}
            setIsEnter={setIsEnter}
            text="댓글이 없습니다."
          />
        )}
      </div>
    </>
  );
};

export default Feed;
