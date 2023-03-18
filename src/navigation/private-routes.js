import { lazy } from "react";
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));

export const privateRoutes = [
  {
    path: "/my-account",
    element: ProfilePage,
  },
];
