import React from "react";

interface PostsProfileProps {
  profileImage: string | null;
}

const PostsProfileImage: React.FC<PostsProfileProps> = ({ profileImage }) => {
  return (
    <div
      className="
        w-[40px] 
        h-[40px] 
        rounded-full 
        overflow-hidden 
        hover:brightness-90 
        transition
      "
    >
      <img
        src={profileImage || "/images/anonymous.jpg"}
        alt="ProfileImage"
        className="w-full"
      />
    </div>
  );
};

export default PostsProfileImage;
