import { useEffect } from "react";
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

  const { data, setSize, isValidating } = useSWRInfinite(
    (idx, prev) => getKey(idx, prev, "/post/all"),
    fetcher,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { data: data?.flat(), setSize, isValidating };
};

export default usePosts;
