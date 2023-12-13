import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchFollow } from "../redux/thunk/follow";
import { AppDispatch, RootState } from "../redux/store";

const useFollow = () => {
  const { userId } = useParams();
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
        fetchFollow({ isFollowing, followerId, userId, dispatch, navigate })
      );
    }
  };

  return { isFollowing, followHandler };
};

export default useFollow;
