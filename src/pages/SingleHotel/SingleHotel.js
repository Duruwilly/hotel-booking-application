import React, { useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "../HotelsList/SearchInputHeader";
import ToggledSearchHeader from "../HotelsList/ToggledSearchHeader";
import { AiFillHeart } from "react-icons/ai";
import image1 from "../../assets/images/heroe.jpg";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const SingleHotel = () => {
  const { matches, loading, setHotelDropdownHeader, roomOptions } =
    useMediaQueriesContext();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(
    "These 22sq rooms have their own unique charm, with large georgian windows, original cornices and soft-hued fabrics. Situated on lower floors of the building, these rooms overlook the idyllic street or garden. Retro touches such as deco lampshades and rotary dial phones add character, the queen-size bed is a delight and the bathroom’s walk-in shower, classic metro tiles and Carrara marble details are a joy. There’s also a TV, desk, Bramley toiletries and tea- and coffee-making kit (on request)"
  );
  // console.log(roomOptions.children+=roomOptions.adult);
  return (
    <>
      {/* {matches ? (
        <SearchInputHeader
        />
      ) : (
        <ToggledSearchHeader
        />
      )} */}
      <section style={heroeBg}>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-xl flex flex-col md:flex-row justify-between text-gray-100 absolute bottom-0">
            <div className="flex justify-center items-center gap-4">
              <button
                className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-2xl"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <AiFillHeart className="" />
              </button>
              <div>
                <p className="text-sm font-extralight">
                  London, United Kingdom
                </p>
                <p className="text-3xl">Name of the hotel</p>
              </div>
            </div>
            <div
              className="flex flex-row justify-between md:flex-col items-center py-4 px-8"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <p className=" font-extralight">Price per night</p>
              <p className=" text-2xl">$1,034</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-lg mt-12 mb-16 px-4">
          <select className="outline-none py-3 px-6 border border-gray-300 text-base">
            <option value="dollar">USD</option>
            <option value="euro">EUR</option>
            <option value="naira">Naira</option>
          </select>
          <div className="mt-3">
            <div className="bg-white border border-gray-200 flex flex-col md:flex-row gap-6">
              <div style={{ flex: 3, position: "relative" }}>
                <img src={image1} className="w-full" />
              </div>
              <div
                style={{ flex: 2, position: "relative" }}
                className="pl-3 pb-3"
              >
                <h1 className="pt-5 text-2xl font-semibold">5 Star Room</h1>
                <p className="py-3">
                  {`${(roomOptions.adult += roomOptions.children)} guest`}
                </p>
                <p className="pr-4 font-normal text-sm leading-relaxed">
                  {!open ? description.slice(0, 200) + "...." : description}
                </p>
                <div
                  className="flex items-center gap-3 mt-4 text-red-900 hover:text-red-700 cursor-pointer w-32"
                  onClick={() => setOpen(!open)}
                >
                  {open ? (
                    <>
                      <p className="text-sm">Read less</p>
                      <IoIosArrowUp />
                    </>
                  ) : (
                    <>
                      <p className="text-sm">Read more</p>
                      <IoIosArrowDown />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-4 mt-3">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col justify-between">
                  <p className="text-sm">A free bottle of body wash</p>
                  <p className="text-sm">
                    For more details{" "}
                    <Link
                      to="/terms-and-condition"
                      className="font-bold hover:text-red-600"
                    >
                      see our terms and conditions
                    </Link>
                  </p>
                </div>
                <div>
                  <p className="flex justify-between items-center font-light text-gray-700 pt-3 md:pt-0">
                    Per night
                    <span className="font-semibold text-xl">$1,034</span>
                  </p>
                  <p className="flex justify-between font-light text-gray-700">
                    Total stay
                    <span className="font-semibold text-xl">$1,693</span>
                  </p>
                  <button className="bg-green-700 w-full py-3 px-24 text-white font-semibold text-center border-none rounded-sm capitalize mt-9">
                    book now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleHotel;
