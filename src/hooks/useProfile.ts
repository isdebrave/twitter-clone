import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";

const useProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data, mutate } = useSWRImmutable(
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
