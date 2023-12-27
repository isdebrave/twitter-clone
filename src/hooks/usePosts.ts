import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

import fetcher from "../libs/fetcher";
import getKey from "../libs/getKey";

const usePosts = () => {
  // const { data, mutate } = useSWRImmutable("/post/all", fetcher, {
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, {
    onError: (error) => {
      console.log(error);
    },
  });

  return { data: data?.flat(), size, setSize };
};

export default usePosts;
