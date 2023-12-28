import React from "react";
import { useNavigate } from "react-router-dom";

import MainHeading from "../components/MainHeading";
import useNotifications from "../hooks/useNotifications";

const Notifications = () => {
  const navigate = useNavigate();
  const { data } = useNotifications();

  console.log(data);

  return (
    <>
      <MainHeading title="Notifications" onClick={() => navigate(-1)} />
    </>
  );
};

export default Notifications;
