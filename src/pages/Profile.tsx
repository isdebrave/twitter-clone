import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import Button from "../components/Button";
import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import { fetchProfile } from "../redux/reducers/profile";
import { AppDispatch, RootState } from "../redux/store";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const me = useSelector((state: RootState) => state.me);
  const { userId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ userId, navigate }));
    }
  }, [dispatch, userId, navigate]);

  // button label 수정
  const buttonLabel = useCallback(() => {
    if (userId === me.id) {
      return "Set up profile";
    }

    const alreadyFollowId = me.followingIds.find((id) => id === userId);

    if (alreadyFollowId) {
      return "Unfollow";
    } else {
      return "Follow";
    }
  }, [me.followingIds, me.id, userId]);

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
