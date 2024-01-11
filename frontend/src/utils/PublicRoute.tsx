import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = localStorage.getItem("auth");

  return !auth ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;
