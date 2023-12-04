import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import Button from "../components/Button";
import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Feed from "../components/feeds/Feed";

import { onProfileSave } from "../redux/reducers/profile";
import { RootState } from "../redux/store";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/user/profile", { userId })
      .then((res) => {
        dispatch(onProfileSave(res.data));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error?.response?.data);
          navigate("/home");
        }
      });
  }, [dispatch, userId, navigate]);

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
      <div className="mt-3 flex justify-end">
        <Button
          onClick={() => {}}
          bgColor={bgWhite}
          textColor={textBlack}
          hoverColor={hoverGray}
          label="Set up profile"
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
      <Feed posts={profile.posts} />
    </>
  );
};

export default Profile;
