import React, { useState } from "react";
import { useSelector } from "react-redux";

import Drop from "../../Drop";

import { src } from "../../../helpers/image";

import { RootState } from "../../../redux/store";

const MobileProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useSelector((state: RootState) => state.me);

  return (
    <div className="relative flex flex-col justify-center">
      {showDrop && <Drop userId={me.id.slice(0, 10)} />}

      <div
        onClick={() => setShowDrop((cur) => !cur)}
        className="w-[36px] h-[36px] flex rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={src(me.profileImage)}
          alt="ProfileImage"
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MobileProfile;
