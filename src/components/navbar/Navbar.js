import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo2.png";
import Header from "../header/Header";
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import FixedHeroe from "../heroe/FixedHeroe";
import FixedHeader from "../header/FixedHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { matches, setDropDownHeader } = useMediaQueriesContext();

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
        ? setStickyClass("sticky top-0 left-0 z-[999]")
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
    setDropDownHeader(true);
    window.scrollTo(0, 0);
  };

  const toggleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <>
      <header
        className={`h-24 px-4 bg-primary flex justify-center ${stickyClass} text-whit`}
      >
        <div className="w-full max-w-screen-lg flex justify-between items-center">
          <div className="lg:hidden flex items-center justify-center gap-3">
            <FaBars className="text-white text-2xl" onClick={toggleMobileNav} />
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white ${stickySearchIcon}`}
            >
              <CiSearch
                className="text-white text-2xl"
                onClick={toggleDropDownHeader}
              />
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 text-gray-200">
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
            <div className="text-gray-200 hidden lg:block">
              <Link to="/register" className="px-4 border-r-2 border-white">
                Register
              </Link>
              <Link to="/login" className="px-4">
                Login
              </Link>
            </div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white">
              <BsFillHeartFill />
            </div>
          </div>
          {/* mobile nav */}
          <div className={`${mobileNav ? "left0" : "left-100"} lg:hidden mobile-wrapper`}>
            <div className="mobile-overlay" onClick={toggleMobileNav}></div>
            <MobileNav toggle={toggleMobileNav} />
          </div>
        </div>
      </header>
      {/* from min-width 1050 and above, remove the search from the heroe and fix it at the top */}
      {matches && <FixedHeroe />}
      {/* from min-width 1050 and above, display the header component else replace it with the demo search component  */}
      {matches ? <Header /> : <FixedHeader />}
    </>
  );
};

export default Navbar;
