import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import useProfile from "../hooks/useProfile";
import useFollow from "../hooks/useFollow";

import { onProfileModalOpen } from "../redux/reducers/profileModal";

const Profile = () => {
  const { profile, me } = useProfile();
  const { isFollowing, followHandler } = useFollow();

  const navigate = useNavigate();
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

  const mouseEnterHandler = (e: React.MouseEvent) => {
    if (!isFollowing(profile.id)) return;
    if (profile.id === me.id) return;

    const button = e.target as HTMLButtonElement;
    const span = button.children[0] as HTMLElement;

    if (span) {
      span.textContent = "Unfollow";
      button.classList.add("hover:border-rose-200");
      button.classList.add("hover:bg-rose-100");
      button.classList.add("hover:text-red-500");
    }
  };

  const mouseLeaveHandler = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    const span = button.children[0];

    button.classList.remove("hover:border-rose-200");
    button.classList.remove("hover:bg-rose-100");
    button.classList.remove("hover:text-red-500");

    if (span && span.textContent === "Unfollow") {
      span.textContent = "Following";
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    if (profile.id === me.id) {
      return dispatch(onProfileModalOpen());
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
          onMouseEnter={mouseEnterHandler}
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
