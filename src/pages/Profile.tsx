import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

const Profile = () => {
  const { data } = useProfile();
  const { isFollowing, followHandler, sanitizeFollowId } = useFollow();
  const { userId: profileId } = useParams();

  const profileModal = useProfileModal();
  const me = useSelector((state: RootState) => state.me);
  const profile = useSelector((state: RootState) => state.profile);

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    if (profileId && profile.id !== data.id) {
      sanitizeFollowId(data, profileId);
    }
  }, [profile, data, sanitizeFollowId, profileId]);

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

    return profileId && followHandler({ e, followerId: profile.id, profileId });
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
