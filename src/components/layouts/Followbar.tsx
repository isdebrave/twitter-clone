import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUsers, { UserProps } from "../../hooks/useUsers";
import Button from "../Button";
import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

const Followbar = () => {
  const navigate = useNavigate();
  const users = useUsers();

  useEffect(() => {
    axios
      .get("/user/all")
      .then((res) => {
        users.onValue(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="col-span-1 my-3 hidden lg:block lg:pl-8 lg:w-[350px]">
      <div className="py-3 rounded-lg bg-gray-100">
        <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
        {users.value?.map((user: UserProps) => (
          <button
            key={user.id}
            onClick={() => navigate("/bye")}
            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-200"
          >
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                src={user.profileImage || "./images/anonymous.jpg"}
                alt="UserImage"
                className="w-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold">{user.username}</span>
              <span className="text-gray-500">@{user.username}</span>
            </div>

            <div className="ml-auto">
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate("/hi");
                }}
                label="Follow"
                bgColor={bgBlack}
                textColor={textWhite}
                hoverColor={hoverLightWhite}
                fit
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Followbar;
