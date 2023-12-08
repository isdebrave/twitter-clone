import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFollowList } from "../redux/thunk/followList";
import { AppDispatch, RootState } from "../redux/store";

const useFollowList = () => {
  const followList = useSelector((state: RootState) => state.followList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFollowList());
  }, [dispatch]);

  return { followList };
};

export default useFollowList;
