import { lazy } from "react";
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
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const BasketPage = lazy(() => import("../pages/basketPage/BasketPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const WishlistsPage = lazy(() =>
  import("../pages/favouritePage/FavouritesPage")
);
const TransactionsPage = lazy(() =>
  import("../pages/TransactionsPage/TransactionsPage")
);
const ProfilePage = lazy(() => import("../pages/profilePage/ProfilePage"));
const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgetPasswordPage/ForgorPassword")
);
const ResetPasswordLink = lazy(() =>
  import("../pages/ForgetPasswordPage/ResetPassword")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"))

export const publicRoutes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/destinations/hotels",
    element: HotelsListPage,
  },
  {
    path: "/hotel/:hotelName/:location/:hotelId",
    element: SingleHotelPage,
  },
  {
    path: "/about-us",
    element: AboutUsPage,
  },
  {
    path: "/about-us/:id",
    element: BookWithUsPage,
  },
  // {
  //   path: "/reviews",
  //   element: ReviewsPage,
  // },
  {
    path: "/contact",
    element: ContactPage,
  },
  {
    path: "/travel-team",
    element: TravelTeamPage,
  },
  {
    path: "/travel-team/:teamName/:id",
    element: TravelTeamProfilePage,
  },
  // {
  //   path: "/register",
  //   element: RegisterPage,
  // },
  // {
  //   path: "/login",
  //   element: LoginPage,
  // },
  {
    path: "/basket",
    element: BasketPage,
  },
  {
    path: "/payment",
    element: PaymentPage,
  },
  {
    path: "/wishlists",
    element: WishlistsPage,
  },
  {
    path: "/transactions",
    element: TransactionsPage,
  },
  // {
  //   path: "/my-account",
  //   element: ProfilePage,
  // },
  {
    path: "/forgot-password",
    element: ForgotPasswordPage,
  },
  {
    path: "/users/resetpassword/:resetToken",
    element: ResetPasswordLink,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];
