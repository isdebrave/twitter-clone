import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import MainHeading from "../components/MainHeading";

import PostProfile from "../components/post/PostProfile";
import PostBody from "../components/post/PostBody";
import PostFooter from "../components/post/PostFooter";

import { RootState } from "../redux/store";
import { onPostSave } from "../redux/reducers/post";
import PostIcon from "../components/post/PostIcon";
import { BiHeart, BiMessageRounded } from "react-icons/bi";

const Post = () => {
  const post = useSelector((state: RootState) => state.post);
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
        <hr className="my-3" />
        <div className="flex justify-around">
          <PostIcon
            icon={BiMessageRounded}
            length={post.comments.length}
            groupTextHoverColor="group-hover:text-sky-500"
            groupBgHoverColor="group-hover:bg-sky-200/40"
          />
          <PostIcon
            icon={BiHeart}
            length={post.likedIds.length}
            groupTextHoverColor="group-hover:text-rose-500"
            groupBgHoverColor="group-hover:bg-rose-200/40"
          />
        </div>
        <hr className="my-3" />
      </div>
    </>
  );
};

export default Post;
