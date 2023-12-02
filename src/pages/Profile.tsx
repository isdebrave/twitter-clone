import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import { bgWhite, hoverGray, textBlack } from "../constants/colors";

import Button from "../components/Button";

import { RootState } from "../redux/store";

const Profile = () => {
  const me = useSelector((state: RootState) => state.me);

  const createdAt = useMemo(() => {
    if (me.createdAt) {
      return format(new Date(me.createdAt), "MMMM yyyy");
    }
  }, [me?.createdAt]);

  return (
    <>
      <div className="z-10 sticky top-0 bg-white flex items-center py-1 px-4 gap-6">
        <div className="p-2 rounded-full hover:bg-neutral-300/40 cursor-pointer">
          <IoMdArrowBack size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">{me?.username}</span>
          <span className="font-bold text-xs text-gray-400">
            {me?.posts.length} posts
          </span>
        </div>
      </div>
      <div className="bg-gray-300 h-44 w-full relative">
        {me?.coverImage && <img src={me.coverImage} alt="CoverImage" />}
        <div
          className="
            w-[130px] 
            h-[130px] 
            border-4 
            border-white 
            rounded-full 
            absolute
            bottom-0
            translate-y-1/2
            translate-x-4
            cursor-pointer
          "
        >
          <img
            src={me?.profileImage || "./images/anonymous.jpg"}
            alt="ProfileImage"
            className="w-full rounded-full object-cover hover:brightness-90 transition"
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          bgColor={bgWhite}
          textColor={textBlack}
          hoverColor={hoverGray}
          label="Set up profile"
          fit
          bold
        />
      </div>
      <div>
        <div>
          <span className="font-bold text-lg">{me?.username}</span>
          <span className="font-bold text-lg">@{me?.username}</span>
        </div>
        <div>
          <BiCalendar />
          <span>Joined {createdAt}</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
