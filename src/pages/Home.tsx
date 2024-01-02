import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WritePost from "../components/WritePost";
import Lists from "../components/Lists";

import usePosts from "../hooks/usePosts";

import { RootState } from "../redux/store";
import { onPosts } from "../redux/reducers/posts";

const Home = () => {
  const { data, setSize, isValidating, setPageIndex, size } = usePosts();

  const posts = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    // console.log(data);

    if (posts.length < data.length) {
      dispatch(onPosts(data));
    }
  }, [posts, data, dispatch]);

  return (
    <>
      <div className="hidden sm:block mt-4">
        <WritePost setPageIndex={setPageIndex} />
        <hr className="my-3" />
      </div>
      <hr className="sm:hidden" />
      {posts.length === 0 ? (
        <span className="block text-neutral-500 text-center p-6 text-xl">
          포스팅이 없습니다.
        </span>
      ) : (
        <Lists
          lists={posts}
          setSize={setSize}
          isValidating={isValidating}
          setPageIndex={setPageIndex}
          size={size}
        />
      )}
    </>
  );
};

export default Home;
