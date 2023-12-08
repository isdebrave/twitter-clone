import React from "react";
import { useNavigate } from "react-router-dom";

import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

import Button from "../Button";

import useFollowList from "../../hooks/useFollowList";
import useFollow from "../../hooks/useFollow";

const Followbar = () => {
  const navigate = useNavigate();
  const { followList } = useFollowList();
  const { isFollowing, followHandler } = useFollow();

  const profileHandler = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    navigate(href);
  };

  return (
    <div className="sticky top-3 ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {followList.map((user) => (
        <div
          key={user.id}
          onClick={(e) => profileHandler(e, user.id)}
          className="px-3 py-2 flex items-center gap-3 hover:bg-gray-200 cursor-pointer"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={user.profileImage || "/images/anonymous.jpg"}
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
              <Button
                onClick={(e) => e && followHandler(e, user.id)}
                label={isFollowing(user.id) ? "Following" : "Follow"}
                bgColor={bgBlack}
                textColor={textWhite}
                hoverColor={hoverLightWhite}
                fit
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Followbar;
