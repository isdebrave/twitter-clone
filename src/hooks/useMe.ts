import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import fetcher from "../libs/fetcher";

const useMe = () => {
  const navigate = useNavigate();

  const { data, mutate } = useSWRImmutable("/user/me", fetcher, {
    onError: (error) => {
      console.log(error);
      localStorage.removeItem("auth");
      return navigate("/auth");
    },
  });

  return { data, mutate };
};

export default useMe;
