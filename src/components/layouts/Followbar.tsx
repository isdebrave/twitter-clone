import React from "react";
import { useNavigate } from "react-router-dom";

import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

import { src } from "../../helpers/image";

import useFollowList from "../../hooks/useFollowList";
import useFollow from "../../hooks/useFollow";
import useProfile from "../../hooks/useProfile";
import { mouseEnterHandler, mouseLeaveHandler } from "../../helpers/mouse";

const Followbar = () => {
  const navigate = useNavigate();
  const { followList } = useFollowList();
  const { mutate } = useProfile();
  const { isFollowing, followHandler } = useFollow(mutate);

  return (
    <div className="sticky top-3 ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {followList?.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(user.id)}
          className="px-3 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={src(user.profileImage)}
              alt="UserImage"
              className="w-full"
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
                onMouseEnter={(e) => mouseEnterHandler(e, isFollowing, user.id)}
                onMouseLeave={mouseLeaveHandler}
                onClick={(e) => e && followHandler(e, user.id)}
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
    </div>
  );
};

export default Followbar;
