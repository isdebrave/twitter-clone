import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import MainHeading from "../components/MainHeading";

import { RootState } from "../redux/store";
import { PostState } from "../redux/reducers/posts";
import FeedProfileImage from "../components/feeds/FeedProfileImage";
import FeedItem from "../components/feeds/FeedItem";
import { onPostSave } from "../redux/reducers/post";

const Post = () => {
  const post = useSelector((state: RootState) => state.post);
  const { userId, postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.user && post.user.id !== userId) {
      navigate(`/${post.user.id}/status/${postId}`);
    }
  }, [post.user, navigate, userId, postId]);

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
      <MainHeading title="Post" />
      <div className="p-2 px-4 hover:bg-neutral-300/20">
        <div className="flex gap-3">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={
                post.user?.profileImage ||
                "http://localhost:3000/images/anonymous.jpg"
              }
              alt="ProfileImage"
              className="w-full"
            />
          </div>
          {/* <FeedProfileImage profileImage={post.user.profileImage} /> */}
          {/* <div className="flex-1">
              <FeedItem
                username={post.user.username}
                userId={post.user.id.slice(0, 10)}
                createdAt={post.createdAt}
                body={post.body}
                images={post.images}
              />
            </div> */}
        </div>
      </div>
    </>
  );
};

export default Post;
