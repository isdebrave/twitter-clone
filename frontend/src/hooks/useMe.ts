import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import fetcher from "../libs/fetcher";

const errorHandler = (error: AxiosError, navigate: NavigateFunction) => {
  console.log(error.response?.data);

  localStorage.removeItem("auth");

  if (error.response?.status === 500) {
    return alert(error.response.data);
  }

  navigate("/auth");
};

const useMe = () => {
  const url = "/user/me";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey: ["useMe", url],
    queryFn: () => fetcher(url),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useMe"] });
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

export default useMe;
