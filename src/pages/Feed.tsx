import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { BiHeart, BiSolidHeart, BiMessageRounded } from "react-icons/bi";

import MainHeading from "../components/MainHeading";
import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";
import Icon from "../components/Icon";

import { RootState } from "../redux/store";
import { onPostLiked, onPostSave } from "../redux/reducers/post";
import { onUpdatePosts } from "../redux/reducers/posts";

const Feed = () => {
  const post = useSelector((state: RootState) => state.post);
  const me = useSelector((state: RootState) => state.me);
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/post/${postId}`)
      .then((res) => {
        dispatch(onPostSave(res.data));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error?.response?.data);
          navigate("/home");
        }
      });
  }, [postId, dispatch, navigate]);

  const likedHandler = useCallback(() => {
    axios
      .post("/post/liked", { postId })
      .then((res) => {
        dispatch(onPostLiked({ meId: me.id, status: res.data }));
        dispatch(onUpdatePosts());
      })
      .catch((error) => {
        console.log(error);
      });
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
        <PostFooter createdAt={post.createdAt} />
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
