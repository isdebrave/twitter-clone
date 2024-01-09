import useSWRImmutable from "swr/immutable";

import fetcher from "../libs/fetcher";

const useFollowList = () => {
  const { data, mutate } = useSWRImmutable("/user/followLists", fetcher, {
    onError: (error) => {
      console.log(error);

      if (error.response.status === 500) {
        return alert(error.response.data);
      }
    },
  });

  return { data, mutate };
};

export default useFollowList;
