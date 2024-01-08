import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import fetcher from "../libs/fetcher";

import useHomePageIndex from "./useHomePageIndex";
import useProfilePageIndex from "./useProfilePageIndex";

import { RootState } from "../redux/store";
import useCommentPageIndex from "./useCommentPageIndex";

interface ListsProps {
  pathname: string;
  category: "HOME" | "PROFILE" | "COMMENT";
}

const useLists = ({ pathname, category }: ListsProps) => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const homePageIndex = useHomePageIndex();

  const profilePageIndex = useProfilePageIndex();
  const profileIndexReset = profilePageIndex.onReset;
  const profile = useSelector((state: RootState) => state.profile);
  const { userId: profileId, postId } = useParams();

  const commentPageIndex = useCommentPageIndex();
  const commentIndexReset = commentPageIndex.onReset;
  const post = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (category === "HOME") {
      setPageIndex(homePageIndex.page);
    }

    if (category === "PROFILE") {
      if (profile.id !== profileId) {
        profileIndexReset();
        setHasMoreData(true);
      }
      setPageIndex(profilePageIndex.page);
    }

    if (category === "COMMENT") {
      if (post.id !== postId) {
        commentIndexReset();
        setHasMoreData(true);
      }
      setPageIndex(commentPageIndex.page);
    }
  }, [
    category,
    homePageIndex.page,
    profilePageIndex.page,
    commentPageIndex.page,
    profile.id,
    post.id,
    profileId,
    postId,
    profileIndexReset,
    commentIndexReset,
  ]);

  const { data, isValidating, mutate } = useSWRImmutable(
    `${pathname}?page=${pageIndex}&limit=3`,
    fetcher,
    { onError: (error) => console.log(error) }
  );

  useEffect(() => {
    if (!data) return;

    if (data.length === 0) {
      setHasMoreData(false);
    }
  }, [data, pageIndex]);

  return {
    data,
    isValidating,
    mutate,
    hasMoreData,
  };
};

export default useLists;
