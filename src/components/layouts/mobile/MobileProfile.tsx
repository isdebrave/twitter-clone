import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import Drop from "../../Drop";

import { RootState } from "../../../redux/store";

const MobileProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useSelector((state: RootState) => state.me);

  const clickHandler = useCallback(() => {
    setShowDrop((cur) => !cur);
  }, []);

  return (
    <div className="relative flex flex-col justify-center">
      {showDrop && <Drop />}
      <button
        onClick={clickHandler}
        className="w-[36px] h-[36px] rounded-full overflow-hidden"
      >
        <img
          src={me?.profileImage || ""}
          alt="ProfileImage"
          className="w-full"
        />
      </button>
    </div>
  );
};

export default MobileProfile;
