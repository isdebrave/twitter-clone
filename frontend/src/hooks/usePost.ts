import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import fetcher from "../libs/fetcher";

const errorHandler = (error: AxiosError<any>, navigate: NavigateFunction) => {
  toast.error(error.response?.data);

  if (error.response?.status === 500) {
    return alert(error.response.data);
  }

  navigate("/home");
};

const usePost = () => {
  const { postId } = useParams();

  const url = `/post/${postId}`;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey: ["usePost", url],
    queryFn: () => fetcher(url),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usePost"] });
    },
    onError: (error) => errorHandler(error as AxiosError, navigate),
  });

  useEffect(() => {
    if (isError) {
      errorHandler(error as AxiosError, navigate);
    }
  }, [error, isError, navigate]);

  return { data, mutate: mutateAsync };
};

export default usePost;
