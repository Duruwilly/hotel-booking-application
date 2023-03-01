import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import examImg from "../../assets/images/popularSearch2.jpg";
import examIm from "../../assets/images/popularsearch4.jpeg";
import example from "../../assets/images/popularsearch3.jpeg";
import { Link } from "react-router-dom";

const TopHotels = () => {
  const options = {
    loop: true,
    margin: 12,
    nav: true,
    smartSpeed: 500,
    autoplay: true,
    dots: false,
    autoplayTimeout: 6000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      750: {
        items: 3,
      },
      1100: {
        items: 3,
      },
    },
  };
  return (
    <section className="flex flex-col items-center mt-20">
      <h2 className="text-3xl mb-5 flex">Top hotels</h2>
      <div className="w-full max-w-screen-lg justify-center items-center px-4">
        <OwlCarousel className=" owl-carousel owl-theme" {...options}>
          {/* start top hotel */}
          <div className="border border-gray-300 block rounded-b-lg">
            <Link
              to="/"
              className="services-one__single-img relative block overflow-hidden"
            >
              <img src={examImg} alt="" />
              <div className="overlay absolute top-0 right-0 left-0 bottom-0"></div>
            </Link>
            <div class="services-one__single-content relative block px-2 py-4">
              <Link
                to="/"
                className="text-red-900 hover:text-red-600 font-bold capitalize text-xl"
              >
                hotel de-aventis
              </Link>
              <p className="font-light">lekki phase 1, Lagos</p>
            </div>
          </div>
          {/*  */}

          <div className="border border-gray-300 block rounded-b-lg">
            <Link
              to="/"
              className="services-one__single-img relative block overflow-hidden"
            >
              <img src={examIm} alt="" />
              <div className="overlay absolute top-0 right-0 left-0 bottom-0"></div>
            </Link>
            <div class="services-one__single-content relative block px-2 py-4">
              <Link
                to="/"
                className="text-red-900 hover:text-red-600 font-bold capitalize text-xl"
              >
                hotel de-aventis
              </Link>
              <p className="font-light">lekki phase 1, Lagos</p>
            </div>
          </div>

          {/*  */}

          <div className="border border-gray-300 block rounded-b-lg">
            <Link
              to="/"
              className="services-one__single-img relative block overflow-hidden"
            >
              <img src={example} alt="" />
              <div className="overlay absolute top-0 right-0 left-0 bottom-0"></div>
            </Link>
            <div class="services-one__single-content relative block px-2 py-4">
              <Link
                to="/"
                className="text-red-900 hover:text-red-600 font-bold capitalize text-xl"
              >
                hotel de-aventis
              </Link>
              <p className=" font-light">lekki phase 1, Lagos</p>
            </div>
          </div>

          {/*  */}

          <div className="border border-gray-300 block rounded-b-lg">
            <Link
              to="/"
              className="services-one__single-img relative block overflow-hidden"
            >
              <img src={examIm} alt="" />
              <div className="overlay absolute top-0 right-0 left-0 bottom-0"></div>
            </Link>
            <div class="services-one__single-content relative block px-2 py-4">
              <Link
                to="/"
                className="text-red-900 hover:text-red-600 font-bold capitalize text-xl"
              >
                hotel de-aventis
              </Link>
              <p className="font-light">lekki phase 1, Lagos</p>
            </div>
          </div>

          {/* feature end */}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default TopHotels;
