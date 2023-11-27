import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import Root from "./pages/Root";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <PrivateRoute />,
        children: [{ path: "/", element: <Home /> }],
      },
      {
        element: <PublicRoute />,
        children: [{ path: "/auth", element: <Auth /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
