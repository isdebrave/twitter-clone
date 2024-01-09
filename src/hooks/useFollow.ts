import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";

import { RootState } from "../redux/store";
import {
  onProfileFollowAdd,
  onProfileFollowDelete,
} from "../redux/reducers/profile";
import { onMeFollowingAdd, onMeFollowingDelete } from "../redux/reducers/me";

const useFollow = () => {
  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch();

  const isFollowing = (userId: string) => {
    if (me.followingIds.includes(userId)) {
      return true;
    }

    return false;
  };

  const followHandler = ({
    followerId,
    profileId,
  }: {
    followerId: string;
    profileId: string;
  }) => {
    try {
      if (!isFollowing(followerId)) {
        axios.post("/user/follow", { followerId });

        dispatch(onProfileFollowAdd({ meId: me.id, followerId, profileId }));
        dispatch(onMeFollowingAdd({ followerId }));
      } else {
        axios.delete("/user/follow", { data: { followerId } });

        dispatch(onProfileFollowDelete({ meId: me.id, followerId, profileId }));
        dispatch(onMeFollowingDelete({ followerId }));
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return alert(error.response.data);
        }
      }
    }
  };

  return { isFollowing, followHandler };
};

export default useFollow;
