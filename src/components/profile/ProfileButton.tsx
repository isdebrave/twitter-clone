import React from "react";
import { useSelector } from "react-redux";

import { mouseEnterHandler, mouseLeaveHandler } from "../../helpers/mouse";
import { bgWhite, hoverGray, textBlack } from "../../helpers/colors";

import useProfileModal from "../../hooks/useProfileModal";
import useFollow from "../../hooks/useFollow";

import { RootState } from "../../redux/store";
import { ProfileState } from "../../redux/reducers/profile";

interface ProfileButtonProps {
  profile: ProfileState;
  profileId: string | undefined;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  profile,
  profileId,
}) => {
  const profileModal = useProfileModal();
  const { isFollowing, followHandler } = useFollow();

  const me = useSelector((state: RootState) => state.me);

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
      return profileModal.onOpen();
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
