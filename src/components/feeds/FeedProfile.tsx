import React from "react";

import { PostState } from "../../redux/reducers/post";

interface FeedProfileProps {
  post: PostState;
}

const FeedProfile: React.FC<FeedProfileProps> = ({ post }) => {
  return (
    <>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          src={post.user.profileImage || "/images/anonymous.jpg"}
          alt="ProfileImage"
          className="w-full"
        />
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default FeedProfile;
