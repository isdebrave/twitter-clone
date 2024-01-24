import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import fetcher from "../libs/fetcher";

const errorHandler = (error: AxiosError) => {
  console.log(error.response?.data);

  if (error.response?.status === 500) {
    return alert(error.response.data);
  }
};

const useFollowList = () => {
  const url = "/user/followLists";
  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey: ["useFollowList", url],
    queryFn: () => fetcher(url),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useFollowList"] });
    },
    onError: (error) => errorHandler(error as AxiosError),
  });

  useEffect(() => {
    if (isError) {
      errorHandler(error as AxiosError);
    }
  }, [error, isError]);

  return { data, mutate: mutateAsync };
};

export default useFollowList;
