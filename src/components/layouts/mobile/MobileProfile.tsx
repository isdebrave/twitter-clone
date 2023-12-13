import React, { useState } from "react";
import { useSelector } from "react-redux";

import Drop from "../../Drop";

import { RootState } from "../../../redux/store";

const MobileProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useSelector((state: RootState) => state.me);

  return (
    <div className="relative flex flex-col justify-center">
      {showDrop && <Drop userId={me.id.slice(0, 10)} />}
      <button
        onClick={() => setShowDrop((cur) => !cur)}
        className="w-[36px] h-[36px] rounded-full overflow-hidden"
      >
        <img
          src={me?.profileImage || "/images/anonymous.jpg"}
          alt="ProfileImage"
          className="w-full"
        />
      </button>
    </div>
  );
};

export default MobileProfile;
