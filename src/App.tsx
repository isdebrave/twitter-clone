import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import Root from "./pages/Root";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Post from "./pages/Post";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "/", loader: () => redirect("/home") },
          { path: "/home", element: <Home /> },
          { path: "/explore", element: <Explore /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/:userId", element: <Profile /> },
          { path: "/:userId/status/:postId", element: <Post /> },
        ],
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
