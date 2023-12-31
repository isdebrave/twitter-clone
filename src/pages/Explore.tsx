import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import axios from "axios";

import MainHeading from "../components/MainHeading";

import { MeState } from "../redux/reducers/me";

import { src } from "../helpers/image";

const Explore = () => {
  const [users, setUsers] = useState<MeState[]>([]);

  const navigate = useNavigate();

  const debounce = (
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) => {
    let timerId: NodeJS.Timeout;

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerId) clearTimeout(timerId);

      timerId = setTimeout(() => callback(e), delay);
    };
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setUsers([]);
      return;
    }

    try {
      const response = await axios.post("user/search", { value });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainHeading title="Explore" onClick={() => navigate(-1)} />
      <div className="py-2 px-6 w-full relative">
        <input
          type="text"
          placeholder="Search"
          className="
            peer
            w-full
            bg-gray-100
            border
            border-gray-100
            rounded-full
            p-3
            pl-16
            outline-none
            focus:border-sky-500
            focus:bg-white
          "
          onChange={debounce(
            (e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e),
            300
          )}
        />
        <div
          className="
            absolute 
            top-1/2 
            -translate-y-1/2 
            left-12 
            text-gray-500 
            peer-focus:text-sky-500
          "
        >
          <GoSearch size={23} />
        </div>
      </div>

      <div className="mx-6">
        <div
          className="
            w-full
            bg-white
            rounded-lg
            max-h-[350px]
            overflow-auto
          "
          style={{ boxShadow: "0 0 8px #ddd" }}
        >
          {users.map((user) => (
            <Link
              to={`/${user.id}`}
              key={user.id}
              className="
                py-2 
                px-4 
                cursor-pointer 
                hover:bg-slate-100 
                flex 
                items-center 
                gap-2
              "
            >
              <div
                className="
                  w-[40px] 
                  h-[40px] 
                  flex
                  rounded-full 
                  overflow-hidden 
                "
              >
                <img
                  src={src(user.profileImage)}
                  alt="ProfileImage"
                  className="w-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-bold">{user.username}</span>
                <span className="text-gray-500">@{user.id.slice(0, 10)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
