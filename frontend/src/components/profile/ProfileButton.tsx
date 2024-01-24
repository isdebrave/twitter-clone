import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { mouseEnterHandler, mouseLeaveHandler } from "../../helpers/mouse";
import { bgWhite, hoverGray, textBlack } from "../../helpers/colors";

import useFollow from "../../hooks/useFollow";

import { RootState } from "../../redux/store";
import { ProfileState } from "../../redux/reducers/profile";
import { onProfileModalOpen } from "../../redux/reducers/profileModal";

interface ProfileButtonProps {
  profile: ProfileState;
  profileId: string | undefined;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  profile,
  profileId,
}) => {
  const { isFollowing, followHandler } = useFollow();

  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch();

  const buttonLabel = () => {
    if (profile.id === me.id) {
      return "Edit profile";
    }

    if (isFollowing(profile.id)) {
      return "Following";
    }

    return "Follow";
  };

  const clickHandler = () => {
    if (profile.id === me.id) {
      return dispatch(onProfileModalOpen());
    }

    return profileId && followHandler({ followerId: profile.id, profileId });
  };

  return (
    <div className="mt-3 flex justify-end mr-4">
      <button
        onMouseEnter={(e) =>
          mouseEnterHandler(e, isFollowing, profile.id, me.id)
        }
        onMouseLeave={mouseLeaveHandler}
        onClick={clickHandler}
        className={`
            py-2
            px-5
            flex
            flex-row
            justify-center
            items-center
            border-2
            rounded-full
            w-fit
            transition
            ${bgWhite}
            ${textBlack}
            ${hoverGray}
        `}
      >
        <span className="font-semibold">{buttonLabel()}</span>
      </button>
    </div>
  );
};

export default ProfileButton;
