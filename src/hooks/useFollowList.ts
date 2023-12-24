import useSWRImmutable from "swr/immutable";

import fetcher from "../libs/fetcher";

const useFollowList = () => {
  const { data, mutate } = useSWRImmutable("/user/all", fetcher, {
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, mutate };
};

export default useFollowList;
