import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewsLetter from "../newsletter/NewsLetter";

const FooterLinks = () => {
  return (
    // <div className="flex justify-center bg-primary">
    //   <div className="flex flex-wra justify-between gap- px-4 my-10">
    //     <ul className="text-gray-500">
    //       <p className="uppercase text-white">about us</p>
    //       <Link to="/about-us">
    //         <li>Who we are</li>
    //       </Link>
    //       <Link to="/about-us/book-with-us">
    //         <li>Why book with us?</li>
    //       </Link>
    //       <Link to="/reviews">
    //         <li>Reviews from our members</li>
    //       </Link>
    //       <Link to="/travel-team">
    //         <li>Our in-house travel team</li>
    //       </Link>
    //       <Link to="/contact">
    //         <li>Contact us</li>
    //       </Link>
    //     </ul>
    //     <ul className="text-gray-500">
    //       <p className="uppercase text-white">our top countries</p>
    //       <Link to="/top-countries">
    //         <li>England</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>Morocco</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>Africa</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>Spain</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>France</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>Portugal</li>
    //       </Link>
    //       <Link to="/top-countries">
    //         <li>Greece</li>
    //       </Link>
    //     </ul>
    //     <ul className="text-gray-500">
    //       <p className="uppercase text-white">top destination</p>
    //       <Link to="/top-destinations">
    //         <li>Barcelona</li>
    //       </Link>
    //       <Link to="/top-destinations">
    //         <li>London</li>
    //       </Link>
    //       <Link to="/top-destinations">
    //         <li>Paris</li>
    //       </Link>
    //       <Link to="/top-destinations">
    //         <li>Rome</li>
    //       </Link>
    //       <Link to="/top-destinations">
    //         <li>New York</li>
    //       </Link>
    //     </ul>
    //     <ul className="text-gray-500">
    //       <p className="uppercase text-white">policies</p>
    //       <Link to="/privacy-policies">
    //         <li>Privacy Policy</li>
    //       </Link>
    //       <Link to="/terms-of-use">
    //         <li>Terms of use</li>
    //       </Link>
    //       <Link to="/accessibility">
    //         <li>Accessibility</li>
    //       </Link>
    //     </ul>
    //   </div>
    // </div>
    <div className="bg-primary border-t border-gray-800 overflow-x-hidden">
   
        <div className=" flex flex-col md:flex-row justify-between gap-12 md:gap-0 items-cente px-20  py-8" >
          <ul className="text-gray-500 ">
            <p className="uppercase text-white">about us</p>
            <Link to="/about-us">
              <li>Who we are</li>
            </Link>
            <Link to="/about-us/book-with-us">
              <li>Why book with us?</li>
            </Link>
            <Link to="/reviews">
              <li>Reviews from our members</li>
            </Link>
            <Link to="/travel-team">
              <li>Our in-house travel team</li>
            </Link>
            <Link to="/contact">
              <li>Contact us</li>
            </Link>
          </ul>
          <ul className="text-gray-500">
            <p className="uppercase text-white">policies</p>
            <Link to="/privacy-policies">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/terms-of-use">
              <li>Terms of use</li>
            </Link>
            <Link to="/accessibility">
              <li>Accessibility</li>
            </Link>
          </ul>
          {/* <NewsLetter /> */}
          <div className="flex justify-center gap-10 text-gray-100 text-xl mt-">
            <a target="_blank" href="https://instagram.com/theprincewillduru">
              <FaInstagram />
            </a>
            <a target="_blank" href="https://twitter.com/PrincewillDuruU">
              <FaTwitter />
            </a>
            <a target="_blank" href="#">
              <FaPinterestP />
            </a>
            <a target="_blank" href="https://facebook.com/prince.duru.355">
              <FaFacebookF />
            </a>
            {/* <a target="_blank" href="#">
              <FaYoutube />
            </a> */}
          </div>
        </div>
        
   
    </div>
  );
};

export default FooterLinks;
