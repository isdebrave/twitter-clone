import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useFollowId from "./useFollowId";

import { RootState } from "../redux/store";
import {
  ProfileState,
  onProfile,
  onProfileFollowAdd,
  onProfileFollowDelete,
} from "../redux/reducers/profile";
import { onMeFollowingAdd, onMeFollowingDelete } from "../redux/reducers/me";

interface FollowHandlerProps {
  (props: { e: React.MouseEvent; followerId: string; profileId: string }): void;
}

const useFollow = () => {
  const followId = useFollowId();

  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch();

  const isFollowing = (userId: string) => {
    if (me.followingIds.includes(userId)) {
      return true;
    }

    return false;
  };

  const followHandler: FollowHandlerProps = ({ e, followerId, profileId }) => {
    e.stopPropagation();

    try {
      if (!isFollowing(followerId)) {
        axios.post("/user/follow", { followerId });

        dispatch(onProfileFollowAdd({ meId: me.id, followerId, profileId }));
        dispatch(onMeFollowingAdd({ followerId }));

        // followId.onFlag("POST");
        // followId.onMeId(me.id);
        // followId.onAddFollowingIds(followerId);
      } else {
        axios.delete("/user/follow", { data: { followerId } });

        dispatch(onProfileFollowDelete({ meId: me.id, followerId, profileId }));
        dispatch(onMeFollowingDelete({ followerId }));

        // followId.onFlag("DELETE");
        // followId.onMeId(me.id);
        // followId.onDeleteFollowingIds(followerId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const sanitizeFollowId = (swrData: ProfileState, profileId: string) => {
  //   const data = { ...swrData };
  //   const { flag, meId, followingIds, onReset } = followId;

  //   if (flag === "POST") {
  //     if (profileId === meId) {
  //       const me = new Set(data.followingIds);
  //       followingIds.forEach((id) => me.add(id));
  //       data.followingIds = Array.from(me);
  //     }

  //     if (followingIds.includes(profileId)) {
  //       const follower = new Set(data.followerIds);
  //       follower.add(meId);
  //       data.followerIds = Array.from(follower);
  //     }
  //   } else {
  //     if (profileId === meId) {
  //       const me = new Set(data.followingIds);
  //       followingIds.forEach((id) => me.add(id));
  //       data.followingIds = Array.from(me);
  //     }

  //     if (followingIds.includes(profileId)) {
  //       data.followerIds = data.followerIds.filter((id) => id !== meId);
  //     }
  //   }

  //   // onReset();
  //   dispatch(onProfile(data));
  // };

  return { isFollowing, followHandler };
};

export default useFollow;
