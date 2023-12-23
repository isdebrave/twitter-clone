import useSWRImmutable from "swr/immutable";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";

const usePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data, mutate } = useSWRImmutable(
    postId ? `/post/${postId}` : null,
    fetcher,
    {
      onError: (error) => {
        toast.error(error.response.data);
        navigate("/home");
      },
    }
  );

  return { data, mutate };
};

export default usePost;
