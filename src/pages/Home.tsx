import React, { useEffect } from "react";

import PostForm from "../components/PostForm";
import Feed from "../components/feeds/Feed";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onPostsSave } from "../redux/reducers/posts";
import { RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (posts.length === 0) {
      axios
        .get("/post")
        .then((res) => {
          dispatch(onPostsSave(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [posts.length, dispatch]);

  return (
    <>
      <div className="mt-4">
        <PostForm />
        <hr className="my-3" />
      </div>
      <Feed posts={posts} />
    </>
  );
};

export default Home;
