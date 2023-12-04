import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

import Button from "../Button";

import { onFollowListSave } from "../../redux/reducers/followList";
import {
  onAddFollowerToProfile,
  onAddFollowingToProfile,
} from "../../redux/reducers/profile";
import { RootState } from "../../redux/store";

const Followbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const followList = useSelector((state: RootState) => state.followList);
  const me = useSelector((state: RootState) => state.me);
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get("/user/all")
      .then((res) => {
        dispatch(onFollowListSave(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const profileHandler = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.stopPropagation();
      navigate(href);
    },
    [navigate]
  );

  const followHandler = useCallback(
    (e: React.MouseEvent, followerId: string) => {
      e.stopPropagation();

      axios
        .post("/user/follow", { followerId })
        .then((res) => {
          if (userId === me.id) {
            dispatch(onAddFollowingToProfile(res.data.meRest));
          }
          if (userId === res.data.followerRest.id) {
            dispatch(onAddFollowerToProfile(res.data.followerRest));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch, me.id, userId]
  );

  return (
    <div className="sticky top-3 ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {followList.map((user) => (
        <div
          key={user.id}
          onClick={(e) => profileHandler(e, user.id)}
          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={user.profileImage || "/images/anonymous.jpg"}
              alt="UserImage"
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold w-[120px] overflow-hidden whitespace-nowrap">
              {user.username}
            </span>
            <span className="text-gray-500">@{user.id.slice(0, 10)}</span>
          </div>

          <div className="ml-auto">
            <Button
              onClick={(e) => e && followHandler(e, user.id)}
              label="Follow"
              bgColor={bgBlack}
              textColor={textWhite}
              hoverColor={hoverLightWhite}
              fit
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followbar;
