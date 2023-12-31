import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WritePost from "../components/WritePost";
import Lists from "../components/Lists";

import usePosts from "../hooks/usePosts";

import { RootState } from "../redux/store";
import { onPosts } from "../redux/reducers/posts";

const Home = () => {
  const { data, setSize, isValidating } = usePosts();
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    if (posts.length !== data.length) {
      dispatch(onPosts(data));
    }
  }, [posts, data, dispatch]);

  if (posts.length === 0) return;

  return (
    <>
      <div className="hidden sm:block mt-4">
        <WritePost />
        <hr className="my-3" />
      </div>
      <hr className="sm:hidden" />
      <Lists lists={posts} setSize={setSize} isValidating={isValidating} />
    </>
  );
};

export default Home;
