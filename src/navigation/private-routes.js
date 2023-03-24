import { lazy } from "react";
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const TransactionsPage = lazy(() =>
  import("../pages/TransactionsPage/TransactionsPage")
);

export const privateRoutes = [
  {
    path: "/my-account",
    component: ProfilePage,
  },
  {
    path: "/transactions",
    component: TransactionsPage,
  },
];
