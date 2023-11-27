import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";
import { bgWhite, hoverGray, textBlack } from "../constants/colors";
import useMe from "../hooks/useMe";

const Home = () => {
  const me = useMe();

  useEffect(() => {
    if (!me.value) {
      axios
        .get("/user")
        .then((res) => {
          me.onValue(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [me]);

  return (
    <>
      <h1>Home</h1>
      <Link to={`${axios.defaults.baseURL}/auth/logout`} className="block">
        <Button
          onClick={() => localStorage.removeItem("auth")}
          bgColor={bgWhite}
          textColor={textBlack}
          hoverColor={hoverGray}
          label="로그아웃"
        />
      </Link>
    </>
  );
};

export default Home;
