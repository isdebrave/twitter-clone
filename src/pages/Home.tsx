import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import PostForm from "../components/PostForm";
import Posts from "../components/posts/Posts";

import { RootState } from "../redux/store";
import { onPostsSave } from "../redux/reducers/posts";

const Home = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts.isUpdatedOnce) {
      axios
        .get("/post")
        .then((res) => {
          dispatch(onPostsSave(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [posts.isUpdatedOnce, dispatch]);

  return (
    <>
      <div className="mt-4">
        <PostForm />
        <hr className="my-3" />
      </div>
      <Posts posts={posts.value} />
    </>
  );
};

export default Home;
