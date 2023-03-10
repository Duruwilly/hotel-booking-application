import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    // <div
    //   className="relative overflow-hidden"
    //   style={{ background: "rgba(31, 41, 55, 1)" }}
    // >
    //   <div className="mt-6 bg-gray-800">
    //     <div className="flex justify-center gap-10">
    //       <Link to="/">
    //         <p className="text-white capitalize">legal</p>
    //       </Link>
    //       <Link to="/">
    //         <p className="text-white">FAQs</p>
    //       </Link>
    //       <Link to="/">
    //         <p className="text-white capitalize">blogs</p>
    //       </Link>
    //     </div>
    //     <div className="flex justify-center gap-10 text-white text-xl mt-6">
    //       <a target="_blank" href="https://instagram.com/theprincewillduru">
    //         <FaInstagram />
    //       </a>
    //       <a target="_blank"  href="https://twitter.com/PrincewillDuruU">
    //         <FaTwitter />
    //       </a>
    //       <a target="_blank"  href="#">
    //         <FaPinterestP />
    //       </a>
    //       <a target="_blank"  href="https://facebook.com/prince.duru.355">
    //         <FaFacebookF />
    //       </a>
    //       <a target="_blank"  href="#">
    //         <FaYoutube />
    //       </a>
    //     </div>
    //     <p className="flex justify-center text-white mt-10 mb-6">
    //       &copy; 2023 Will Trip - Built by Princewill Duru
    //     </p>
    //   </div>
    // </div>
    <div style={{ position: "relative" }} className="bg-primary border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between pt-7 pb-28 px-20">
        <div className="flex justify-center gap-10 text-gray-400 text-sm">
          <Link to="/">
            <p className="hover:text-white capitalize">legal</p>
          </Link>
          <Link to="/">
            <p className="hover:text-white">FAQs</p>
          </Link>
          <Link to="/">
            <p className="hover:text-white capitalize">blogs</p>
          </Link>
        </div>
        <p className="text-gray-400 text-xs text-center">
          &copy; 2023 Will Trip - Built by Princewill Duru
        </p>
      </div>
    </div>
  );
};

export default Footer;
