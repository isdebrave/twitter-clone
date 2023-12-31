import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";
import useSWRInfinite from "swr/infinite";
import getKey from "../libs/getKey";
import { ProfileState } from "../redux/reducers/profile";

const useProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data } = useSWRImmutable(
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

  return { data };
};

export default useProfile;
