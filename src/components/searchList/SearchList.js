import React from "react";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../assets/images/heroe.jpg";
import image2 from "../../assets/images/heroe2.jpg";
import { AiFillHeart } from "react-icons/ai";

const SearchList = ({ roomOptions, hotel, days }) => {
  return (
    <div className="bg-white border border-gray-200 flex flex-col hotelList-card-container mb-7">
      <div style={{ flex: 3, position: "relative" }}>
        <Link to={`/hotel/${hotel.name}/${hotel.country}/${hotel._id}`}>
          <img src={image1} className="w-full" />
        </Link>
        <div className="absolute top-0 right-0">
          <button
            className="rounded-full w-12 h-12 p-0 border-0 inline-flex items-center justify-center text-3xl text-gray-200"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <AiFillHeart className="" />
          </button>
        </div>
      </div>
      <div
        style={{ flex: 2, position: "relative" }}
        className="flex flex-col justify-start"
      >
        <h2 className="text-gray-400 uppercase text-sm font-light pt-5 mr-16">
          {hotel.country + "," + " " + hotel.state}
        </h2>
        <h1 className="font-semibold capitalize text-xl py-2">{hotel.name}</h1>
        <p className="text-gray-600 font-light">
          {`${
            roomOptions.adult + roomOptions.children === 1
              ? `Sleeps up to ${hotel.guests} guests`
              : `Sleeps ${hotel.guests} guests`
          }`}
        </p>
        <div className="price-container">
          <div className="py-4 font-semibold text-sm">
            <span className="text-green-600">Best-price guarantee</span>
            <p className="text-red-600 font-semibold">
              free cancellation, payment refundable
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg">
              ${[hotel.price].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <span className="font-semibold text-sm pb-3">
              for {days === 0 ? `1` : days} nights
            </span>
            <Link
              to={`/hotel/${hotel.name}/${hotel.country}/${hotel._id}`}
              className="bg-red-800 w-full py-2 px-8 text-white font-semibold text-center border-none rounded-sm capitalize"
            >
              select room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
