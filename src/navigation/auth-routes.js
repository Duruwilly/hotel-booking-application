import { lazy } from "react";

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
