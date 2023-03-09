import { lazy } from "react";
const HomePage = lazy(() => import("../pages/home/Home"));
const HotelsListPage = lazy(() => import("../pages/HotelsList/HotelsList"));
const SingleHotelPage = lazy(() => import("../pages/SingleHotel/SingleHotel"));
const AboutUsPage = lazy(() => import("../pages/AboutUs/AboutUs"));
const BookWithUsPage = lazy(() => import("../pages/AboutUs/BookWithUs"));
const ReviewsPage = lazy(() => import("../pages/AboutUs/Reviews"));
const ContactPage = lazy(() => import("../pages/AboutUs/Contact"));
const TravelTeamPage = lazy(() => import("../pages/AboutUs/TravelTeam/TravelTeam"));
const TravelTeamProfile = lazy(() =>
  import("../pages/AboutUs/TravelProfile/TravelTeamPage")
);
// const TravelTeam2 = lazy(() =>
//   import("../pages/AboutUs/TravelProfile/TravelTeam2")
// );
// const TravelTeam3 = lazy(() =>
//   import("../pages/AboutUs/TravelProfile/TravelTeam3")
// );
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const BasketPage = lazy(() => import("../pages/basket/Basket"));
const PaymentPage = lazy(() => import("../pages/PaymentPage/Payment"));
const WishlistsPage = lazy(() => import("../pages/favouritePage/Favourites"));

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
  {
    path: "/reviews",
    element: ReviewsPage,
  },
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
    element: TravelTeamProfile,
  },
  // {
  //   path: "/travel-team/laura-laura",
  //   element: TravelTeam2,
  // },
  // {
  //   path: "/travel-team/prince-will",
  //   element: TravelTeam3,
  // },
  {
    path: "/register",
    element: RegisterPage,
  },
  {
    path: "/login",
    element: LoginPage,
  },
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
];
