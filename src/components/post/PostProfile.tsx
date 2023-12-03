import React from "react";
import { Link } from "react-router-dom";

interface PostProfile {
  href: string;
  profileImage: string | null;
  username: string;
  userId: string;
}

const PostProfile: React.FC<PostProfile> = ({
  href,
  profileImage,
  username,
  userId,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Link to={href}>
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden hover:brightness-90 transition">
          <img
            src={profileImage || "/images/anonymous.jpg"}
            alt="ProfileImage"
            className="w-full"
          />
        </div>
      </Link>

      <div className="flex flex-col">
        <Link to={href}>
          <span className="font-bold hover:underline">{username}</span>
        </Link>
        <span className="text-gray-500">@{userId}</span>
      </div>
    </div>
  );
};

export default PostProfile;
