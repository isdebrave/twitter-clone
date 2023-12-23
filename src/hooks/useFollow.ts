import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchFollow } from "../redux/thunk/follow";
import { AppDispatch, RootState } from "../redux/store";
import useMe from "./useMe";
import useProfile from "./useProfile";
import { KeyedMutator } from "swr";

const useFollow = (mutateProfile: KeyedMutator<any>) => {
  const { userId } = useParams();
  const { mutate: mutateMe } = useMe();

  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isFollowing = (followerId: string) => {
    if (me.followingIds.includes(followerId)) {
      return true;
    }

    return false;
  };

  const followHandler = (e: React.MouseEvent, followerId: string) => {
    e.stopPropagation();

    if (userId) {
      dispatch(
        fetchFollow({
          isFollowing,
          followerId,
          userId,
          dispatch,
          navigate,
          mutateMe,
          mutateProfile,
        })
      );
    }
  };

  return { isFollowing, followHandler };
};

export default useFollow;
