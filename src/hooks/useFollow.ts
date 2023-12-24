import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/store";
import {
  onProfileFollowAdd,
  onProfileFollowDelete,
} from "../redux/reducers/profile";
import { onMeFollowingAdd, onMeFollowingDelete } from "../redux/reducers/me";

interface FollowHandlerProps {
  (props: { e: React.MouseEvent; userId: string; profileId: string }): void;
}

const useFollow = () => {
  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch();

  const isFollowing = (userId: string) => {
    if (me.followingIds.includes(userId)) {
      return true;
    }

    return false;
  };

  const followHandler: FollowHandlerProps = ({ e, userId, profileId }) => {
    e.stopPropagation();

    try {
      if (!profileId) return;

      if (!isFollowing(userId)) {
        axios.post("/user/follow", { followerId: userId });
        dispatch(onProfileFollowAdd({ meId: me.id, userId, profileId }));
        dispatch(onMeFollowingAdd({ userId }));
      } else {
        axios.delete("/user/follow", { data: { followerId: userId } });
        dispatch(onProfileFollowDelete({ meId: me.id, userId, profileId }));
        dispatch(onMeFollowingDelete({ userId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { isFollowing, followHandler };
};

export default useFollow;
