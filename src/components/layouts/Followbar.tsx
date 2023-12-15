import React from "react";
import { useNavigate } from "react-router-dom";

import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

import useFollowList from "../../hooks/useFollowList";
import useFollow from "../../hooks/useFollow";

const Followbar = () => {
  const navigate = useNavigate();
  const { followList } = useFollowList();
  const { isFollowing, followHandler } = useFollow();

  const enterHandler = (e: React.MouseEvent, userId: string) => {
    if (!isFollowing(userId)) return;

    const button = e.target as HTMLButtonElement;
    const span = button.children[0] as HTMLElement;

    if (span) {
      span.textContent = "Unfollow";
      button.classList.add("hover:border-rose-200");
      button.classList.add("hover:bg-rose-100");
      button.classList.add("hover:text-red-500");
    }
  };

  const leaveHandler = (e: React.MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    const span = button.children[0];

    button.classList.remove("hover:border-rose-200");
    button.classList.remove("hover:bg-rose-100");
    button.classList.remove("hover:text-red-500");

    if (span && span.textContent === "Unfollow") {
      span.textContent = "Following";
    }
  };

  return (
    <div className="sticky top-3 ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {followList.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(user.id)}
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
              <button
                onMouseEnter={(e) => enterHandler(e, user.id)}
                onMouseLeave={leaveHandler}
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
