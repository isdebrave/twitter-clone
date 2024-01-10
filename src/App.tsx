import React, { lazy } from "react";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));
const PublicRoute = lazy(() => import("./utils/PublicRoute"));

const Root = lazy(() => import("./pages/Root"));
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Profile = lazy(() => import("./pages/Profile"));
const Feed = lazy(() => import("./pages/Feed"));
const Carousel = lazy(() => import("./pages/Carousel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "/", loader: () => redirect("/home") },
          { path: "/home", element: <Home /> },
          { path: "/explore", element: <Explore /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/:userId/status/:postId", element: <Feed /> },
          { path: "/:userId/status/:postId/photo", element: <Carousel /> },
          { path: "/:userId", element: <Profile /> },
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
