import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Layout from "../components/layouts/Layout";

const PrivateRoute = () => {
  const auth = localStorage.getItem("auth");

  return auth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoute;
