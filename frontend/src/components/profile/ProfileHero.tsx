import React from "react";

import { src } from "../../helpers/image";

interface UserHeroProps {
  coverImage: string;
  profileImage: string;
}

const UserHero: React.FC<UserHeroProps> = ({ coverImage, profileImage }) => {
  return (
    <div className="bg-gray-300 h-44 w-full relative">
      {coverImage && (
        <div className="w-full h-full flex">
          <img
            src={src(coverImage)}
            alt="CoverImage"
            className="w-full object-cover"
          />
        </div>
      )}

      <div
        className="
          w-[130px] 
          h-[130px]
          flex 
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
          src={src(profileImage)}
          alt="ProfileImage"
          referrerPolicy="no-referrer"
          className="
            w-full 
            object-cover 
            rounded-full 
            hover:brightness-90 
            transition
          "
        />
      </div>
    </div>
  );
};

export default UserHero;
