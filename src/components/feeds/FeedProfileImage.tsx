import React from "react";

interface FeedProfileProps {
  profileImage: string | null;
}

const FeedProfile: React.FC<FeedProfileProps> = ({ profileImage }) => {
  return (
    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
      <img
        src={profileImage || "./images/anonymous.jpg"}
        alt="ProfileImage"
        className="w-full"
      />
    </div>
  );
};

export default FeedProfile;
