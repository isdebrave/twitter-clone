import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import fetcher from "../libs/fetcher";
import { PostCommentState, PostState } from "../redux/reducers/post";

interface ListsProps {
  pathname: string;
  savedData: PostState[] | PostCommentState[];
  isSameUrl: boolean;
}

const useLists = ({ pathname, savedData, isSameUrl }: ListsProps) => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [lastId, setLastId] = useState("0");

  useEffect(() => {
    if (isSameUrl) {
      if (savedData.length > 1) {
        setLastId(savedData[savedData.length - 1].id);
      }
    }
  }, [savedData, isSameUrl]);

  const { data, isValidating, mutate } = useSWRImmutable(
    `${pathname}?lastId=${lastId}&limit=3`,
    fetcher,
    { onError: (error) => console.log(error) }
  );

  useEffect(() => {
    if (!data) return;

    if (data.length === 0) {
      setHasMoreData(false);
    }
  }, [data]);

  return {
    data,
    isValidating,
    mutate,
    hasMoreData,
    setLastId,
  };
};

export default useLists;
