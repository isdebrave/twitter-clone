import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import Button from "../components/Button";
import ProfileHero from "../components/profile/ProfileHero";
import MainHeading from "../components/MainHeading";
import ProfileBio from "../components/profile/ProfileBio";
import Posts from "../components/posts/Posts";

import { onProfileSave } from "../redux/reducers/profile";
import { RootState } from "../redux/store";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const me = useSelector((state: RootState) => state.me);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // profile에서 heart 누르면 바로 적용 안됨. fetchProfile을 호출해야 됨.
  // 이 fetch를 action으로 불러야 한다. -> createAsyncThunk 필요
  // Posts.tsx에서 onUpdatePosts action으로 새롭게 호출하는데 createAsyncThunk 있으면 그럴 필요 없음.

  // const fetchProfile = useCallback(() => {
  //   axios
  //     .post("/user/profile", { userId })
  //     .then((res) => {
  //       dispatch(onProfileSave(res.data));
  //     })
  //     .catch((error) => {
  //       if (error instanceof AxiosError) {
  //         console.log(error);
  //         toast.error(error?.response?.data);
  //         navigate("/home");
  //       }
  //     });
  // }, [dispatch, userId, navigate]);

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

  // button label 수정
  const buttonLabel = useCallback(() => {
    const alreadyFollowId = me.followerIds.find((id) => id === userId);

    if (alreadyFollowId) {
      return "Unfollow";
    } else {
      if (userId === me.id) {
        return "Set up profile";
      } else {
        return "Follow";
      }
    }
  }, [me.followerIds, me.id, userId]);

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
