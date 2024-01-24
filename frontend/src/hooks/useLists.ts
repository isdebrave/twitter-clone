import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import fetcher from "../libs/fetcher";

import { PostCommentState, PostState } from "../redux/reducers/post";

const errorHandler = (error: AxiosError) => {
  console.log(error.response?.data);
};

interface ListsProps {
  pathname: string;
  savedData: PostState[] | PostCommentState[];
  isSameUrl: boolean;
}

const useLists = ({ pathname, savedData, isSameUrl }: ListsProps) => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [lastId, setLastId] = useState("0");

  useEffect(() => {
    if (isSameUrl) {
      if (savedData.length > 1) {
        setLastId(savedData[savedData.length - 1].id);
      }
    } else {
      setLastId("0");
    }
  }, [savedData, isSameUrl]);

  const url = `${pathname}?lastId=${lastId}&limit=3`;
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching } = useQuery({
    queryKey: ["useLists", url],
    queryFn: () => fetcher(url),
  });

  useEffect(() => {
    if (isError) {
      errorHandler(error as AxiosError);
    }
  }, [error, isError]);

  const { mutateAsync } = useMutation({
    mutationFn: () => fetcher(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useLists"] });
    },
    onError: (error) => errorHandler(error as AxiosError),
  });

  useEffect(() => {
    if (!isSameUrl) {
      return setHasMoreData(true);
    }

    if (!data) return;

    if (data.length === 0) {
      setHasMoreData(false);
    }
  }, [data, isSameUrl]);

  return {
    data,
    isValidating: isFetching,
    mutate: mutateAsync,
    hasMoreData,
    setLastId,
  };
};

export default useLists;
