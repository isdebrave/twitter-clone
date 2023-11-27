import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useLoggedInUser from "../hooks/useLoggedInUser";

const PrivateRoute = () => {
  const user = useLoggedInUser();

  return user.value ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
