import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";

import fetcher from "../libs/fetcher";

const useMe = () => {
  const navigate = useNavigate();

  const { data, mutate } = useSWRImmutable("/user/me", fetcher, {
    onError: (error) => {
      console.log(error);
      localStorage.removeItem("auth");

      if (error.response.status === 500) {
        return alert(error.response.data);
      }

      navigate("/auth");
    },
  });

  return { data, mutate };
};

export default useMe;
