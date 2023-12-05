import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "../components/PostForm";
import Posts from "../components/posts/Posts";

import { AppDispatch, RootState } from "../redux/store";
import { fetchPosts } from "../redux/reducers/posts";

const Home = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!posts.isUpdatedOnce) {
      dispatch(fetchPosts());
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
