import { lazy } from "react";
import CheckAccessRoute from "../utils/CheckAccessRoute";
// import CheckRouteAccess from "../utils/CheckAccessRoute";
const HomePage = lazy(() => import("../pages/HomePage/Home"));
const HotelsListPage = lazy(() =>
  import("../pages/HotelsListPage/HotelsListPage")
);
const SingleHotelPage = lazy(() =>
  import("../pages/SingleHotelPage/SingleHotelPage")
);
const AboutUsPage = lazy(() => import("../pages/AboutUsPage/AboutUsPage"));
const BookWithUsPage = lazy(() => import("../pages/AboutUsPage/BookWithUs"));
// const ReviewsPage = lazy(() => import("../pages/AboutUsPage/Reviews"));
const ContactPage = lazy(() => import("../pages/AboutUsPage/Contact"));
const TravelTeamPage = lazy(() =>
  import("../pages/TravelTeam/TravelTeamPage/TravelTeamPage")
);
const TravelTeamProfilePage = lazy(() =>
  import("../pages/TravelTeam/TravelTeamProfilePage/TravelTeamProfilePage")
);
// const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const BasketPage = lazy(() => import("../pages/basketPage/BasketPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const WishlistsPage = lazy(() =>
  import("../pages/favouritePage/FavouritesPage")
);
// const TransactionsPage = lazy(() =>
//   import("../pages/TransactionsPage/TransactionsPage")
// );
// const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgetPasswordPage/ForgorPassword")
);
const ResetPasswordLink = lazy(() =>
  import("../pages/ForgetPasswordPage/ResetPassword")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const MerchantRegisterPage = lazy(() =>
  import("../pages/MerchantPage/RegisterPage/RegisterPage")
);

const MerchantLoginPage = lazy(() =>
  import("../pages/MerchantPage/LoginPage/LoginPage")
);

const MerchantHomePage = lazy(() =>
  import("../pages/MerchantPage/MerchantHomePage/MerchantHome")
);

export const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/destinations/hotels",
    component: HotelsListPage,
  },
  {
    path: "/hotel/:hotelName/:location/:hotelId",
    component: SingleHotelPage,
  },
  {
    path: "/about-us",
    component: AboutUsPage,
  },
  {
    path: "/about-us/:id",
    component: BookWithUsPage,
  },
  // {
  //   path: "/reviews",
  //   component: ReviewsPage,
  // },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "/travel-team",
    component: TravelTeamPage,
  },
  {
    path: "/travel-team/:teamName/:id",
    component: TravelTeamProfilePage,
  },
  // {
  //   path: "/register",
  //   component: RegisterPage,
  // },
  // {
  //   path: "/login",
  //   component: LoginPage,
  // },
  {
    path: "/basket",
    component: BasketPage,
  },
  {
    path: "/payment",
    component: PaymentPage,
  },
  {
    path: "/wishlists",
    component: WishlistsPage,
  },
  // {
  //   path: "/transactions",
  //   component: TransactionsPage,
  // },
  // {
  //   path: "/my-account",
  //   component: ProfilePage,
  // },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
  },
  {
    path: "/users/resetpassword/:resetToken",
    component: ResetPasswordLink,
  },
  {
    path: "/merchant-register",
    component: MerchantRegisterPage,
  },
  {
    path: "/merchant-login",
    component: MerchantLoginPage,
  },
  {
    path: "/merchant-home",
    component: () => (
      <CheckAccessRoute role="merchant" component={MerchantHomePage} />
    ),
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
