import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import useProfile from "../hooks/useProfile";
import useFollow from "../hooks/useFollow";
import useProfileModal from "../hooks/useProfileModal";

import { mouseEnterHandler, mouseLeaveHandler } from "../helpers/mouse";

import { RootState } from "../redux/store";
import { onProfile } from "../redux/reducers/profile";

const Profile = () => {
  const { data, mutate } = useProfile();
  const { isFollowing, followHandler } = useFollow(mutate);
  const profileModal = useProfileModal();

  const me = useSelector((state: RootState) => state.me);
  const profile = useSelector((state: RootState) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    if (profile.id !== data.id) {
      dispatch(onProfile(data));
    }
  }, [profile, data, dispatch]);

  const buttonLabel = () => {
    if (profile.id === me.id) {
      return "Edit profile";
    }

    if (isFollowing(profile.id)) {
      return "Following";
    }

    return "Follow";
  };

  const clickHandler = (e: React.MouseEvent) => {
    if (profile.id === me.id) {
      return profileModal.onOpen();
    }

    return followHandler(e, profile.id);
  };

  return (
    <>
      <MainHeading
        title={profile.username}
        length={profile.posts.length}
        onClick={() => navigate(-1)}
        backdropBlur
      />
      <ProfileHero
        coverImage={profile.coverImage}
        profileImage={profile.profileImage}
      />
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
      <ProfileBio
        username={profile.username}
        userId={profile.id.slice(0, 10)}
        bio={profile.bio}
        createdAt={profile.createdAt}
        followingIdsLength={profile.followingIds.length}
        followerIdsLength={profile.followerIds.length}
      />
      <hr className="my-3" />
      <Posts posts={profile.posts} />
    </>
  );
};

export default Profile;
