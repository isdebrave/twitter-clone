import React from "react";
import { useNavigate } from "react-router-dom";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import Button from "../components/Button";
import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import useProfile from "../hooks/useProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, me } = useProfile();

  // button label 수정
  const buttonLabel = () => {
    if (profile.id === me.id) {
      return "Set up profile";
    }

    if (me.followingIds.includes(profile.id)) {
      return "Unfollow";
    } else {
      return "Follow";
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
        <Button
          onClick={() => {}}
          bgColor={bgWhite}
          textColor={textBlack}
          hoverColor={hoverGray}
          label={buttonLabel()}
          fit
          bold
        />
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
