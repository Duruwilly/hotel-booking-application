import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { MobileNavBtn } from "../button/MobileNavBtn";

const MobileNav = ({ toggle }) => {
  return (
    <nav className="mobile-nav_content bg-primary">
      <span
        className="mobile-nav__close absolute top-5 right-4 text-lg text-gray-300 cursor-pointer"
        onClick={toggle}
      >
        <FaTimes />
      </span>
      <div className=" mt-8" onClick={toggle}>
        <div className="pb-5">
          <Link to="/register">
            <MobileNavBtn text="Register" />
          </Link>
        </div>
        <Link to="/login">
          <MobileNavBtn text="Login" />
        </Link>
        <div className="text-gray-300 flex flex-col justify-center items-center py-5">
          <Link to="/" className="py-5 text-center">
            Who we are
          </Link>
          <Link to="/" className="py-5 text-center">
            Who book with us
          </Link>
          <Link to="/" className="py-5 text-center">
            Reviews from our members
          </Link>
          <Link to="/" className="py-5 text-center">
            Our in-house travel team
          </Link>
          <Link to="/" className="py-5 text-center">
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
