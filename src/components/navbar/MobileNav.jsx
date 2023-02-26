import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { MobileNavBtn } from "../button/MobileNavBtn";
import { useAuthContext } from "../../context/AuthContext";
import { IoIosArrowDown } from "react-icons/io";

const MobileNav = ({ toggle }) => {
  const { user } = useAuthContext();

  return (
    <nav className="mobile-nav_content bg-primary">
      <span
        className="mobile-nav__close absolute top-5 right-4 text-lg text-gray-300 cursor-pointer"
        onClick={toggle}
      >
        <FaTimes />
      </span>
      <div className=" mt-8">
        {user ? (
          <div className="text-gray-300 text-sm relative cursor-pointer dropdown">
            <div className="flex justify-center items-center gap-1">
              <span className="flex justify-center items-center capitalize text-center">{`hi, ${user.fullname}`}</span>
              <IoIosArrowDown className="text-inherit text-xl" />
            </div>
            <ul onClick={toggle}>
              <li className="text-center capitalize">profile</li>
              <li className="text-center capitalize">logout</li>
            </ul>
          </div>
        ) : (
          <>
            <div className="pb-5" onClick={toggle}>
              <Link to="/register">
                <MobileNavBtn text="Register" />
              </Link>
            </div>
            <Link to="/login">
              <MobileNavBtn text="Login" />
            </Link>
          </>
        )}
        <div className="text-gray-300 flex flex-col justify-center items-center py-5" onClick={toggle}>
          <Link to="/about-us" className="py-5 text-center">
            Who we are
          </Link>
          <Link to="/about-us/book-with-us" className="py-5 text-center">
            Who book with us
          </Link>
          <Link to="/reviews" className="py-5 text-center">
            Reviews from our members
          </Link>
          <Link to="/travel-team" className="py-5 text-center">
            Our in-house travel team
          </Link>
          <Link to="/contact" className="py-5 text-center">
            Contact us
          </Link>
        </div>
      </div>
      <div
        className="pt-24"
        style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        <h1 className="text-center text-gray-300 text-sm">
          Travel and Tour at your comfort and convinience
        </h1>
      </div>
    </nav>
  );
};

export default MobileNav;
