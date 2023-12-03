import React from "react";

interface UserHeroProps {
  coverImage: string | null;
  profileImage: string | null;
}

const UserHero: React.FC<UserHeroProps> = ({ coverImage, profileImage }) => {
  return (
    <div className="bg-gray-300 h-44 w-full relative">
      {coverImage && <img src={coverImage} alt="CoverImage" />}
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
          src={profileImage || "./images/anonymous.jpg"}
          alt="ProfileImage"
          className="w-full rounded-full object-cover hover:brightness-90 transition"
        />
      </div>
    </div>
  );
};

export default UserHero;
