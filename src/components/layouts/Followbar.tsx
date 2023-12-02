import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";

import Button from "../Button";

import { onUsersSave } from "../../redux/reducers/users";
import { RootState } from "../../redux/store";

const Followbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    axios
      .get("/user/all")
      .then((res) => {
        dispatch(onUsersSave(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div className="ml-8 my-3 py-3 rounded-lg bg-gray-100">
      <h3 className="font-bold text-xl px-3 mb-5">Who to follow</h3>
      {users?.map((user) => (
        <button
          key={user.id}
          onClick={() => navigate("/bye")}
          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-200"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              src={user.profileImage || ""}
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
  );
};

export default Followbar;
