import useSWRImmutable from "swr/immutable";
import { useSelector } from "react-redux";

import fetcher from "../libs/fetcher";

import { RootState } from "../redux/store";

const useNotifications = () => {
  const me = useSelector((state: RootState) => state.me);

  const { data } = useSWRImmutable(
    me.id ? `/notification/all?userId=${me.id}` : null,
    fetcher,
    { onError: (error) => console.log(error) }
  );

  return { data };
};

export default useNotifications;
