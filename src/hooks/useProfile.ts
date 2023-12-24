import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";
import useSWR from "swr";

const useProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, mutate } = useSWR(
    userId ? `/user/profile/${userId}` : null,
    fetcher,
    {
      onError: (error) => {
        console.log(error);
        toast.error(error.response.data);
        return navigate("/home");
      },
    }
  );

  return { data, mutate };
};

export default useProfile;
