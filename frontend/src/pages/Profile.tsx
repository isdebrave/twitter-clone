import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainHeading from "../components/MainHeading";
import Lists from "../components/Lists";
import Loader from "../components/Loader";
import ProfileHero from "../components/profile/ProfileHero";
import ProfileBio from "../components/profile/ProfileBio";
import ProfileButton from "../components/profile/ProfileButton";

import useProfile from "../hooks/useProfile";
import useLists from "../hooks/useLists";

import { RootState } from "../redux/store";
import { onProfile, onProfilePosts } from "../redux/reducers/profile";

const Profile = () => {
  const [isEnter, setIsEnter] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { userId: profileId } = useParams();

  const profile = useSelector((state: RootState) => state.profile);

  const { data, mutate } = useProfile(profileId!);
  const {
    data: listsData,
    isValidating,
    mutate: listsMutate,
    hasMoreData,
  } = useLists({
    pathname: `/user/profile/${profileId}/post/all`,
    savedData: profile.posts,
    isSameUrl: profile.id === profileId,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    if (!isLocked && profile.id !== data.id) {
      setIsLocked(true);
      mutate()
        .then((data) => {
          dispatch(onProfile(data));
          setIsLocked(false);
        })
        .catch((error) => console.log(error));
    }
  }, [profile.id, data, dispatch, mutate, isLocked]);

  useEffect(() => {
    if (hasMoreData && profile.posts.length === 0) {
      setIsEnter(true);
    }
  }, [profile.posts, hasMoreData]);

  useEffect(() => {
    if (!listsData) return;

    if (hasMoreData && isEnter) {
      listsMutate()
        .then((data) => {
          dispatch(onProfilePosts(data));
          setIsEnter(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEnter, listsMutate, listsData, dispatch, hasMoreData]);

  return (
    <div className="relative h-full">
      {profile.id !== profileId ? (
        <Loader size={80} absolute text />
      ) : (
        <>
          <MainHeading
            title={profile.username}
            length={profile.totalPostsCount}
            onClick={() => navigate(-1)}
            backdropBlur
          />
          <ProfileHero
            coverImage={profile.coverImage}
            profileImage={profile.profileImage}
          />
          <ProfileButton profile={profile} profileId={profileId} />
          <ProfileBio
            username={profile.username}
            userId={profile.id.slice(0, 10)}
            bio={profile.bio}
            createdAt={profile.createdAt}
            followingIdsLength={profile.followingIds.length}
            followerIdsLength={profile.followerIds.length}
          />
          <hr className="my-3" />
          {hasMoreData && profile.posts.length === 0 ? (
            <Loader size={80} text />
          ) : (
            <Lists
              lists={profile.posts}
              isValidating={isValidating}
              isEnter={isEnter}
              setIsEnter={setIsEnter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
