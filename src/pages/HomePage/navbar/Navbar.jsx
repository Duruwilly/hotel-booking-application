import React, { useEffect, useState } from "react";
import {
  BsBagCheck,
  BsFillHeartFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo2.png";
import Header from "../header/Header";
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import FixedHeroe from "../component/heroe/FixedHeroe";
import FixedHeader from "../header/FixedHeader";
import { useMediaQueriesContext } from "../../../context/MediaQueryContext";
import MobileNav from "./MobileNav";
import { useAuthContext } from "../../../context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import { useBasketContext } from "../../../context/BasketItemsContext";
import { useFavouriteContext } from "../../../context/FavouriteItemsContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { matches, setDropdownHeader } = useMediaQueriesContext();
  const {
    getUserDetails,
    userProfileDetails,
    setFetchingState,
  } = useUserProfileContext();
  const { basketItems, setBasketItems, setFetchStatus } = useBasketContext();
  const { favouriteItems, setFavouriteItems, setFavouriteFetchStatus } =
    useFavouriteContext();

  const { user, dispatch } = useAuthContext();

  const [stickyClass, setStickyClass] = useState("relative");
  const [stickySearchIcon, setStickySearchIcon] = useState("hidden");

  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickSearchIcon);

    return () => {
      window.removeEventListener("scroll", stickSearchIcon);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 600
        ? setStickyClass("sticky top-0 left-0 z-[90]")
        : setStickyClass("relative");
    }
  };

  const stickSearchIcon = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 600
        ? setStickySearchIcon("block")
        : setStickySearchIcon("hidden");
    }
  };

  const toggleDropDownHeader = () => {
    setDropdownHeader(true);
    window.scrollTo(0, 0);
  };

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setBasketItems([]);
    setFavouriteItems([]);
  };

  useEffect(() => {
    if (!user) {
      setBasketItems([]);
      setFavouriteItems([]);
    }
  }, [user]);

  useEffect(() => {
    setFetchingState("idle");
  }, []);

  useEffect(() => {
    setFetchStatus("idle");
  }, []);

  useEffect(() => {
    setFavouriteFetchStatus("idle");
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [user?.token]);

  return (
    <>
      <header
        className={`h-24 px-4 bg-primary flex justify-center ${stickyClass}`}
      >
        <div className="w-full max-w-screen-xl flex justify-between items-center">
          <div className="navIconsToggle flex items-center justify-center gap-3">
            <FaBars className="text-white text-2xl" onClick={toggleMobileNav} />
            {location.pathname !== "/basket" &&
            location.pathname !== "/payment" ? (
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white ${stickySearchIcon}`}
              >
                <CiSearch
                  className="text-white text-2xl"
                  onClick={toggleDropDownHeader}
                />
              </div>
            ) : null}
          </div>

          <div className="hidden navTelephone items-center gap-2 text-gray-300 text-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900">
              <BsFillTelephoneFill className="text-white" />
            </div>
            <span>
              Call us on{" "}
              <a href="tel:+2349000000000" className="border-b border-white">
                +234 900 0000 000
              </a>
            </span>
          </div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="lg:h-20 md:h-20 sm:h-16 h-12"
            />
          </Link>
          <div className="flex gap-3 justify-between items-center">
            {user ? (
              <div className="text-gray-300 text-sm hidden lg:block relative cursor-pointer dropdown">
                <div className="flex justify-center items-center gap-1">
                  <span className="capitalize">{`hi, ${
                    userProfileDetails?.fullname !== undefined
                      ? userProfileDetails?.fullname
                      : ""
                  }`}</span>
                  <IoIosArrowDown className="text-inherit text-xl" />
                </div>
                <ul>
                  <Link to="/my-account">
                    <li className="capitalize">profile</li>
                  </Link>
                  <li
                    className="capitalize"
                    onClick={() => {
                      handleLogout();
                      navigate("/");
                    }}
                  >
                    logout
                  </li>
                </ul>
              </div>
            ) : (
              <div className="text-gray-300 text-sm hidden lg:block">
                <Link to="/register" className="px-4 border-r-2 border-white">
                  Register
                </Link>
                <Link to="/login" className="px-4">
                  Login
                </Link>
              </div>
            )}
            <div className="tooltip relative">
              <Link to="/wishlists">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white cursor-pointer">
                  <BsFillHeartFill />
                </div>
                {favouriteItems.length > 0 && (
                  <div className="amount-container">
                    <p className="total-amount">{favouriteItems.length}</p>
                  </div>
                )}
              </Link>
              <span className="tooltiptext">Favourite</span>
            </div>
            <div className="relative tooltip">
              <Link to="/basket" className="">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white cursor-pointer relative toolti">
                  <BsBagCheck />
                </div>
                {basketItems.length > 0 && (
                  <div className="amount-container">
                    <p className="total-amount">{basketItems.length}</p>
                  </div>
                )}
              </Link>
              <span className="tooltiptext">Basket</span>
            </div>
          </div>
          {/* mobile nav */}
          <div
            className={`${
              mobileNav ? "left0" : "left-100"
            } navMobileVisibility mobile-wrapper`}
          >
            <div className="mobile-overlay" onClick={toggleMobileNav}></div>
            <MobileNav
              toggle={toggleMobileNav}
              userProfileDetails={userProfileDetails}
            />
          </div>
        </div>
      </header>
      {/* from min-width 1050 and above, remove the search from the heroe and fix it at the top */}
      {matches && location.pathname === "/" ? <FixedHeroe /> : null}
      {/* {matches && <FixedHeroe /> } */}
      {/* from min-width 1050 and above, display the header component else replace it with the demo search component  */}
      {/* {matches ? <Header /> : <FixedHeader />} */}
      {matches ? (
        <Header />
      ) : location.pathname === "/" ? (
        <FixedHeader />
      ) : null}
    </>
  );
};

export default Navbar;
