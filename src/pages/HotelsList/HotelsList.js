import React, { useState } from "react";
import FixedHeader from "../../components/header/FixedHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "./SearchInputHeader";
import { BiSort } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../assets/images/heroe.jpg";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import ToggledSearchHeader from "./ToggledSearchHeader";
import Spinner from "../../components/Spinner/Spinner";

const HotelsList = () => {
  const { matches, loading, setHotelDropdownHeader } = useMediaQueriesContext();
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [roomOptions, setRoomOptions] = useState(location.state.roomOptions);
  return (
    <>
      {matches ? (
        <SearchInputHeader
          date={date}
          setDate={setDate}
          destination={destination}
          setDestination={setDestination}
          roomOptions={roomOptions}
          setRoomOptions={setRoomOptions}
        />
      ) : (
        <ToggledSearchHeader
          date={date}
          setDate={setDate}
          destination={destination}
          setDestination={setDestination}
          roomOptions={roomOptions}
          setRoomOptions={setRoomOptions}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <section className="flex justify-center">
          <div className="w-full max-w-screen-xl py-5 px-4">
            <ul className="flex my-0 mx-auto list-none">
              <li className="uppercase text-xs border border-gray-900 bg-primary py-3 w-full text-white text-center list-none font-semibold">
                22 Hotels
              </li>
              <select className="uppercase text-xs border bg-transparent border-gray-900 text-black py-3 px- w-full text-center list-none font-semibold">
                <option>sort prices</option>
              </select>
              <li className="uppercase text-xs border border-gray-900 py-3 px- w-full text-black text-center list-none font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <FaMapMarkerAlt />
                  view on map
                </div>
              </li>
            </ul>
            <div className="mt-5" onClick={() => setHotelDropdownHeader(false)}>
              <div className="bg-white border border-gray-200 flex flex-col hotelList-card-container mb-7">
                <div style={{ flex: 3, position: "relative" }}>
                  <Link to="hotel">
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
                    london united kingdom
                  </h2>
                  <h1 className="font-semibold capitalize text-xl py-2">
                    name of the hotel
                  </h1>
                  <p className="text-gray-600 font-light">Sleeps 3 guest</p>
                  <div className="price-container">
                    <div className="py-4 font-semibold text-sm">
                      <span className="text-green-600">
                        Best-price guarantee
                      </span>
                      <p className="text-red-600 font-semibold">
                        free cancellation, payment refundable
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-lg">$1,054</p>
                      <span className="font-semibold text-sm pb-3">
                        for 4 nights
                      </span>
                      <Link
                        to="hotel"
                        className="bg-red-800 w-full py-2 px-8 text-white font-semibold text-center border-none rounded-sm capitalize"
                      >
                        select room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col hotelList-card-container mb-7">
                <div style={{ flex: 3, position: "relative" }}>
                  <Link to="hotel">
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
                    london united kingdom
                  </h2>
                  <h1 className="font-semibold capitalize text-xl py-2">
                    name of the hotel
                  </h1>
                  <p className="text-gray-600 font-light">Sleeps 3 guest</p>
                  <div className="price-container">
                    <div className="py-4 font-semibold text-sm">
                      <span className="text-green-600">
                        Best-price guarantee
                      </span>
                      <p className="text-red-600 font-semibold">
                        free cancellation, payment refundable
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-lg">$1,054</p>
                      <span className="font-semibold text-sm pb-3">
                        for 4 nights
                      </span>
                      <Link
                        to="hotel"
                        className="bg-red-800 w-full py-2 px-8 text-white font-semibold text-center border-none rounded-sm capitalize"
                      >
                        select room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 flex flex-col hotelList-card-container mb-7">
                <div style={{ flex: 3, position: "relative" }}>
                  <Link to="hotel">
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
                    london united kingdom
                  </h2>
                  <h1 className="font-semibold capitalize text-xl py-2">
                    name of the hotel
                  </h1>
                  <p className="text-gray-600 font-light">Sleeps 3 guest</p>
                  <div className="price-container">
                    <div className="py-4 font-semibold text-sm">
                      <span className="text-green-600">
                        Best-price guarantee
                      </span>
                      <p className="text-red-600 font-semibold">
                        free cancellation, payment refundable
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-lg">$1,054</p>
                      <span className="font-semibold text-sm pb-3">
                        for 4 nights
                      </span>
                      <Link
                        to="hotel"
                        className="bg-red-800 w-full py-2 px-8 text-white font-semibold text-center border-none rounded-sm capitalize"
                      >
                        select room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HotelsList;
