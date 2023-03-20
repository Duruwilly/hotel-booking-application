import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from "./components/navbar/Navbar";
import { useMediaQueriesContext } from "./context/MediaQueryContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";
import { publicRoutes } from "./navigation/public-routes";
import Spinner from "./components/Spinner/Spinner";
import Navbar from "./pages/HomePage/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/UserProfileContext";
import { privateRoutes } from "./navigation/private-routes";
import PrivateRouteMiddleware from "./navigation/private-routes-middleware";
import { useCheckAccess } from "./hooks/useCheckAccess";
import { authRoutes } from "./navigation/auth-routes";
import { useAuthContext } from "./context/AuthContext";
import { FavouriteProvider } from "./context/FavouriteItemsContext";
const FooterList = lazy(() => import("./pages/HomePage/footer/FooterList"));
// import {
//   Home,
//   // AboutUs,
//   // BookWithUs,
//   Reviews,
//   Contact,
//   TravelTeam,
//   TravelTeam1,
//   TravelTeam2,
//   TravelTeam3,
//   SingleHotel,
//   HotelsList,
//   Register,
//   Login,
//   Basket,
//   PaymentPage,
//   WishlistsPage,
// } from "./pages";

function App() {
  const { setDropdownHeader } = useMediaQueriesContext();
  const { loggedIn } = useCheckAccess();
  const { user } = useAuthContext();

  const closeModal = () => {
    setDropdownHeader(false);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense>
          <UserContextProvider>
            <Navbar />
          </UserContextProvider>
        </Suspense>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Spinner />}>{<route.element />}</Suspense>
              }
            ></Route>
          ))}

          {authRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Spinner />}>
                  {user ? <Navigate to="/" /> : <route.element />}
                </Suspense>
              }
            ></Route>
          ))}
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              // path={route.path}
              element={<PrivateRouteMiddleware />}
            >
              <Route
                path={route.path}
                element={
                  <Suspense fallback={<Spinner />}>
                    {<route.element />}
                  </Suspense>
                }
              />
            </Route>
          ))}
        </Routes>

        <div onClick={closeModal}>
          <Suspense>
            <FooterList />
          </Suspense>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
