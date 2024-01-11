import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { src } from "../../helpers/image";
import { bgBlack, hoverLightWhite, textWhite } from "../../helpers/colors";
import { mouseEnterHandler, mouseLeaveHandler } from "../../helpers/mouse";
import { stopPropagationHandler } from "../../helpers/event";

import useFollowList from "../../hooks/useFollowList";
import useFollow from "../../hooks/useFollow";

import { RootState } from "../../redux/store";
import { onFollowList } from "../../redux/reducers/followList";

const Followbar = () => {
  const { data } = useFollowList();
  const { isFollowing, followHandler } = useFollow();

  const followList = useSelector((state: RootState) => state.followList);
  const profile = useSelector((state: RootState) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    dispatch(onFollowList(data));
  }, [data, dispatch]);

  return (
    <div className="sticky top-3 ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {followList.length === 0 ? (
        <span className="block text-neutral-500 text-center p-6 text-xl">
          추천 리스트가 없습니다.
        </span>
      ) : (
        <>
          {followList.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(user.id)}
              className="px-3 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer"
            >
              <div className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
                <img
                  src={src(user.profileImage)}
                  alt="UserImage"
                  className="w-full object-cover"
                />
              </div>

              <div className="flex items-center flex-1">
                <div className="flex flex-col">
                  <span className="font-bold w-[120px] overflow-hidden whitespace-nowrap">
                    {user.username}
                  </span>
                  <span className="text-gray-500">@{user.id.slice(0, 10)}</span>
                </div>

                <div className="ml-auto">
                  <button
                    onMouseEnter={(e) =>
                      mouseEnterHandler(e, isFollowing, user.id)
                    }
                    onMouseLeave={mouseLeaveHandler}
                    onClick={stopPropagationHandler(() =>
                      followHandler({
                        followerId: user.id,
                        profileId:
                          profile.id.length === 0 ? user.id : profile.id,
                      })
                    )}
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
                      ${bgBlack}
                      ${textWhite}
                      ${hoverLightWhite}
                    `}
                  >
                    <span>{isFollowing(user.id) ? "Following" : "Follow"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Followbar;
