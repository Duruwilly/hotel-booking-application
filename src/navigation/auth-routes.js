import { lazy } from "react";

const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));

export const authRoutes = [
  {
    path: "/register",
    element: RegisterPage,
  },
  {
    path: "/login",
    element: LoginPage,
  },
];
