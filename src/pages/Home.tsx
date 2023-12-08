import React from "react";

import WritePost from "../components/WritePost";
import Posts from "../components/posts/Posts";

import usePosts from "../hooks/usePosts";

const Home = () => {
  const posts = usePosts();

  return (
    <>
      <div className="mt-4">
        <WritePost />
        <hr className="my-3" />
      </div>
      <Posts posts={posts} />
    </>
  );
};

export default Home;
