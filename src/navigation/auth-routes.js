import { lazy } from "react";

// const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginRegisterPage/LoginPage"));
const LoginRegisterPage = lazy(() =>
  import("../pages/LoginRegisterPage/LoginRegisterPage")
);

export const authRoutes = [
  // {
  //   path: "/register",
  //   component: RegisterPage,
  // },
  {
    path: "/login",
    component: LoginRegisterPage,
  },
];
