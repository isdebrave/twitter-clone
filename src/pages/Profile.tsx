import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Lists from "../components/Lists";

import useProfile from "../hooks/useProfile";
import useFollow from "../hooks/useFollow";
import useProfileModal from "../hooks/useProfileModal";
import useProfilePageIndex from "../hooks/useProfilePageIndex";
import useLists from "../hooks/useLists";

import { bgWhite, hoverGray, textBlack } from "../helpers/colors";
import { mouseEnterHandler, mouseLeaveHandler } from "../helpers/mouse";

import { RootState } from "../redux/store";
import { onProfile, onProfilePosts } from "../redux/reducers/profile";

const Profile = () => {
  const [isEnter, setIsEnter] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { userId: profileId } = useParams();

  const { isFollowing, followHandler } = useFollow();
  const { data, mutate } = useProfile(profileId);

  const me = useSelector((state: RootState) => state.me);
  const profile = useSelector((state: RootState) => state.profile);

  const profilePageIndex = useProfilePageIndex();
  const pageIndexPlus = profilePageIndex.onPlus;
  const {
    data: listsData,
    isValidating: listsIsValidating,
    mutate: listsMutate,
    hasMoreData,
  } = useLists({
    pathname: `/user/profile/${profileId}/post/all`,
    category: "PROFILE",
  });
  const profileModal = useProfileModal();

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
  }, [profile.posts.length, hasMoreData]);

  useEffect(() => {
    if (!listsData) return;

    if (hasMoreData && isEnter) {
      listsMutate()
        .then((data) => {
          dispatch(onProfilePosts(data));
          setIsEnter(false);
          pageIndexPlus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isEnter, listsMutate, listsData, dispatch, hasMoreData, pageIndexPlus]);

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
    <div className="relative h-full">
      {hasMoreData && profile.posts.length === 0 ? (
        <div
          className="
            absolute
            z-50
            w-full
            h-full
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <ClipLoader color="lightblue" size={80} />
          <span>Loading...</span>
        </div>
      ) : (
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
          <Lists
            lists={profile.posts}
            isValidating={listsIsValidating}
            isEnter={isEnter}
            setIsEnter={setIsEnter}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
