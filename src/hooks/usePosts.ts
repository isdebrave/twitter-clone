import useSWRImmutable from "swr/immutable";

import fetcher from "../libs/fetcher";

const usePosts = () => {
  const { data, mutate } = useSWRImmutable("/post/all", fetcher, {
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, mutate };
};

export default usePosts;
