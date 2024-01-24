import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";

import fetcher from "../libs/fetcher";

import { RootState } from "../redux/store";

const errorHandler = (error: AxiosError) => {
  console.log(error.response?.data);

  if (error.response?.status === 500) {
    return alert(error.response.data);
  }
};

const useNotifications = () => {
  const me = useSelector((state: RootState) => state.me);

  const url = `/notification/all?userId=${me.id}`;
  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey: ["useNotifications", url],
    queryFn: () => fetcher(url),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useNotifications"] });
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

export default useNotifications;
