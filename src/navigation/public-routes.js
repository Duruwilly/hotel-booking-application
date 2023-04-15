import { lazy } from "react";
import CheckAccessRoute from "../utils/CheckAccessRoute";

const HomePage = lazy(() => import("../pages/HomePage/Home"));

const HotelsListPage = lazy(() =>
  import("../pages/HotelsListPage/HotelsListPage")
);

const SingleHotelPage = lazy(() =>
  import("../pages/SingleHotelPage/SingleHotelPage")
);

const AboutUsPage = lazy(() => import("../pages/AboutUsPage/AboutUsPage"));

const BookWithUsPage = lazy(() => import("../pages/AboutUsPage/BookWithUs"));

const ContactPage = lazy(() => import("../pages/AboutUsPage/Contact"));

const TravelTeamPage = lazy(() =>
  import("../pages/TravelTeam/TravelTeamPage/TravelTeamPage")
);

const TravelTeamProfilePage = lazy(() =>
  import("../pages/TravelTeam/TravelTeamProfilePage/TravelTeamProfilePage")
);

const ConfirmationPage = lazy(() =>
  import("../pages/ConfirmationPage/ConfirmationPage")
);

const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));

const WishlistsPage = lazy(() =>
  import("../pages/favouritePage/FavouritesPage")
);

const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgetPasswordPage/ForgorPassword")
);

const ResetPasswordLink = lazy(() =>
  import("../pages/ForgetPasswordPage/ResetPassword")
);

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const MerchantHomePage = lazy(() =>
  import("../pages/MerchantPage/MerchantHomePage")
);

const ViewHotelListingPage = lazy(() =>
  import(
    "../pages/MerchantPage/MerchantHomePage/component/HotelListings/ViewHotelList"
  )
);

const ViewRoomListingPage = lazy(() =>
  import(
    "../pages/MerchantPage/MerchantHomePage/component/RoomsListings/ViewRoomsListing"
  )
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
  {
    path: "/confirmation",
    component: ConfirmationPage,
  },
  {
    path: "/payment",
    component: PaymentPage,
  },
  {
    path: "/wishlists",
    component: WishlistsPage,
  },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
  },
  {
    path: "/users/resetpassword/:resetToken",
    component: ResetPasswordLink,
  },
  {
    path: "/merchant-home",
    component: () => (
      <CheckAccessRoute role="merchant" component={MerchantHomePage} />
    ),
  },
  {
    path: "/view-hotel-listing/:hotelName/:id",
    component: () => (
      <CheckAccessRoute role="merchant" component={ViewHotelListingPage} />
    ),
  },
  {
    path: "/view-room/:roomTitle/:id",
    component: () => (
      <CheckAccessRoute role="merchant" component={ViewRoomListingPage} />
    ),
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];
