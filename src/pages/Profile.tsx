import React from "react";
import { useNavigate } from "react-router-dom";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import useProfile from "../hooks/useProfile";
import useFollow from "../hooks/useFollow";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, me } = useProfile();
  const { isFollowing, followHandler } = useFollow();

  const buttonLabel = () => {
    if (profile.id === me.id) {
      return "Set up profile";
    }

    if (isFollowing(profile.id)) {
      return "Following";
    }

    return "Follow";
  };

  const enterHandler = (e: React.MouseEvent) => {
    if (!isFollowing(profile.id)) return;

    const button = e.target as HTMLButtonElement;
    const span = button.children[0] as HTMLElement;

    if (span) {
      span.textContent = "Unfollow";
      button.classList.add("border-rose-200");
      button.classList.add("bg-rose-100");
      button.classList.add("text-red-500");
    }
  };

  const leaveHandler = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    const span = button.children[0];

    button.classList.remove("border-rose-200");
    button.classList.remove("bg-rose-100");
    button.classList.remove("text-red-500");

    if (span && span.textContent === "Unfollow") {
      span.textContent = "Following";
    }
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
          onMouseEnter={enterHandler}
          onMouseLeave={leaveHandler}
          onClick={(e) => e && followHandler(e, profile.id)}
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
