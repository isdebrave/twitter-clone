import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import fetcher from "../libs/fetcher";
import getKey from "../libs/getKey";

const usePosts = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, size, setSize, isValidating, mutate } = useSWRInfinite(
    (idx) => getKey({ idx, pageIndex }, "/post/all"),
    fetcher,
    { onError: (error) => console.log(error) }
  );

  return {
    data: data?.flat(),
    size,
    setSize,
    isValidating,
    setPageIndex,
    mutate,
  };
};

export default usePosts;
