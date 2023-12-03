import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import PostForm from "../components/PostForm";
import Feed from "../components/feeds/Feed";

import { onPostsSave } from "../redux/reducers/posts";
import { RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    /*
      여기 버그 있음
      1. posts.length === 0가 없으면 똑같은 post 렌더링됨
      2. profile에서 postModal submit하면 실시간 반영 안됨
      3. sidebar fixed
    */
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
