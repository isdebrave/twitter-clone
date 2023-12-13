import React from "react";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";

interface ProfileBioProps {
  username: string;
  userId: string;
  createdAt: string;
  followingIdsLength: number;
  followerIdsLength: number;
}

const ProfileBio: React.FC<ProfileBioProps> = ({
  username,
  userId,
  createdAt,
  followingIdsLength,
  followerIdsLength,
}) => {
  return (
    <div className="mt-5 px-4 space-y-2">
      <div className="flex flex-col">
        <span className="font-bold text-lg">{username}</span>
        <span className="text-base text-gray-400">@{userId}</span>
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <BiCalendar size={20} />
        <span>
          Joined {createdAt && format(new Date(createdAt), "MMMM yyyy")}
        </span>
      </div>
      <div className="flex gap-5">
        <div className="space-x-1">
          <span className="font-bold">{followingIdsLength}</span>
          <span className="text-gray-500">Following</span>
        </div>
        <div className="space-x-1">
          <span className="font-bold">{followerIdsLength}</span>
          <span className="text-gray-500">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBio;
