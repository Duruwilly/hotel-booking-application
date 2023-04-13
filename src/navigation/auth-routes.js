import { lazy } from "react";

// const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginRegisterPage/LoginPage"));
const LoginRegisterPage = lazy(() =>
  import("../pages/LoginRegisterPage/LoginRegisterPage")
);
const MerchantRegisterPage = lazy(() =>
  import("../pages/MerchantPage/RegisterPage/RegisterPage")
);

const MerchantLoginPage = lazy(() =>
  import("../pages/MerchantPage/LoginPage/LoginPage")
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
  {
    path: "/merchant-register",
    component: MerchantRegisterPage,
  },
  {
    path: "/merchant-login",
    component: MerchantLoginPage,
  },
];
