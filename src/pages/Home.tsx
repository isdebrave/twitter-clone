import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WritePost from "../components/WritePost";
import Lists from "../components/Lists";

import usePosts from "../hooks/usePosts";

import { onPosts } from "../redux/reducers/posts";
import { RootState } from "../redux/store";

const Home = () => {
  const { data, size, setSize } = usePosts();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (!data) return;

    if (posts.length === 0) {
      dispatch(onPosts(data));
    }

    // if (posts.length !== data.length) {
    //   dispatch(onPosts(data));
    // }
  }, [posts, data, dispatch]);

  return (
    <>
      <div className="mt-4">
        <WritePost />
        <hr className="my-3" />
      </div>
      <Lists lists={posts} size={size} setSize={setSize} />
    </>
  );
};

export default Home;
