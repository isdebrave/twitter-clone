import React, { useCallback, useState } from "react";

import useMe from "../../../hooks/useMe";
import Drop from "../../Drop";

const MobileProfile = () => {
  const [showDrop, setShowDrop] = useState(false);
  const me = useMe();

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
          src={me.value?.profileImage || "./images/anonymous.jpg"}
          alt="ProfileImage"
          className="w-full"
        />
      </button>
    </div>
  );
};

export default MobileProfile;
