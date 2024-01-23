import useSWRImmutable from "swr/immutable";
import { NavigateFunction, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import fetcher from "../libs/fetcher";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const errorHandler = (error: AxiosError<any>, navigate: NavigateFunction) => {
  console.log(error.response?.data);

  toast.error(error.response?.data);

  if (error.response?.status === 500) {
    return alert(error.response.data);
  }

  navigate("/home");
};

const useProfile = (profileId: string) => {
  const url = `/user/profile/${profileId}`;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey: ["useProfile", url],
    queryFn: () => fetcher(url),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useProfile"] });
    },
    onError: (error) => errorHandler(error as AxiosError, navigate),
  });

  useEffect(() => {
    if (isError) {
      errorHandler(error as AxiosError, navigate);
    }
  }, [error, isError, navigate]);

  // const { data, mutate } = useSWRImmutable(
  //   profileId ? `/user/profile/${profileId}` : null,
  //   fetcher,
  //   {
  //     onError: (error) => {
  //       console.log(error);
  //       toast.error(error.response.data);

  //       if (error.response.status === 500) {
  //         return alert(error.response.data);
  //       }

  //       navigate("/home");
  //     },
  //   }
  // );

  return { data, mutate: mutateAsync };
};

export default useProfile;
