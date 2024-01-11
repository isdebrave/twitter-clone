import useSWRImmutable from "swr/immutable";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";

const useProfile = (profileId: string | undefined) => {
  const navigate = useNavigate();

  const { data, mutate } = useSWRImmutable(
    profileId ? `/user/profile/${profileId}` : null,
    fetcher,
    {
      onError: (error) => {
        console.log(error);
        toast.error(error.response.data);

        if (error.response.status === 500) {
          return alert(error.response.data);
        }

        navigate("/home");
      },
    }
  );

  return { data, mutate };
};

export default useProfile;
