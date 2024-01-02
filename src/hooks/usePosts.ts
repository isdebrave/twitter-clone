import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
// import useSWRImmutable from "swr/immutable";

import fetcher from "../libs/fetcher";
import getKey from "../libs/getKey";
import { PostState } from "../redux/reducers/post";

const usePosts = () => {
  // const { data, mutate } = useSWRImmutable("/post/all", fetcher, {
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const [pageIndex, setPageIndex] = useState(0);
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (idx) => getKey({ idx, pageIndex }, "/post/all"),
    fetcher,
    { onError: (error) => console.log(error) }
  );

  return { data: data?.flat(), size, setSize, isValidating, setPageIndex };
};

export default usePosts;
