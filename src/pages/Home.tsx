import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import WritePost from "../components/WritePost";
import Lists from "../components/Lists";

import useLists from "../hooks/useLists";
import useHomePageIndex from "../hooks/useHomePageIndex";

import { RootState } from "../redux/store";
import { onPosts } from "../redux/reducers/posts";

const Home = () => {
  const [isEnter, setIsEnter] = useState(false);

  const posts = useSelector((state: RootState) => state.posts);
  const homePageIndex = useHomePageIndex();
  const pageIndexPlus = homePageIndex.onPlus;

  const { data, isValidating, mutate, hasMoreData } = useLists({
    pathname: "/post/all",
    category: "HOME",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (hasMoreData && posts.length === 0) {
      setIsEnter(true);
    }
  }, [posts.length, hasMoreData]);

  useEffect(() => {
    if (!data) return;

    if (hasMoreData && isEnter) {
      mutate()
        .then((data) => {
          dispatch(onPosts(data));
          setIsEnter(false);
          pageIndexPlus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEnter, mutate, data, dispatch, hasMoreData, pageIndexPlus]);

  return (
    <>
      <div className="hidden sm:block mt-4">
        <WritePost />
        <hr className="my-3" />
      </div>
      <hr className="sm:hidden" />
      {hasMoreData && posts.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <ClipLoader color="lightblue" size={80} />
          <span>Loading...</span>
        </div>
      ) : (
        <Lists
          lists={posts}
          isValidating={isValidating}
          isEnter={isEnter}
          setIsEnter={setIsEnter}
          text="포스팅이 없습니다."
        />
      )}
    </>
  );
};

export default Home;
