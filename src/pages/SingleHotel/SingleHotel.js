import React, { useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "../HotelsList/SearchInputHeader";
import ToggledSearchHeader from "../HotelsList/ToggledSearchHeader";
import { AiFillHeart } from "react-icons/ai";
import image1 from "../../assets/images/heroe.jpg";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import { useSharedSearchContext } from "../../context/SearchContext";
import { useAuthContext } from "../../context/AuthContext";
import { MdOutlineSingleBed, MdOutlineKingBed } from "react-icons/md";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import { useSelector } from "react-redux";

const SingleHotel = () => {
  // const { matches, setHotelDropdownHeader, roomOptions } =
  //   useMediaQueriesContext();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  let { roomOptions } = useSelector((state) => state.searchState);

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[4];

  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  const confirmBooking = () => {
    if (user) {
      navigate("/basket");
    } else {
      navigate("/login ");
    }
  };

  let { days } = useDaysCalculate();

  return (
    <>
      {/* {matches ? (
        <SearchInputHeader
        />
      ) : (
        <ToggledSearchHeader
        />
      )} */}
      {loading ? (
        <Spinner />
      ) : (
        <>
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
                      {data?.country + "," + " " + data?.state}
                    </p>
                    <p className="text-3xl">{data?.name}</p>
                  </div>
                </div>
                <div
                  className="flex flex-row justify-between md:flex-col items-center py-4 px-8"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <p className=" font-extralight">Price per night</p>
                  <p className=" text-2xl">
                    $
                    {[data?.price]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex justify-center">
            <div className="w-full max-w-screen-lg mt-12 mb-16 px-4">
              <PriceConversion />
              <div className="mt-3">
                <div className="bg-white border border-gray-200 flex flex-col md:flex-row gap-6">
                  <div style={{ flex: 3, position: "relative" }}>
                    <img src={image1} className="w-full" />
                  </div>
                  <div
                    style={{ flex: 2, position: "relative" }}
                    className="pl-3 pb-3"
                  >
                    <h1 className="pt-5 text-2xl font-semibold">
                      {data?.title}
                    </h1>
                    <p className="py-3">
                      {`${data?.guests} ${
                        data?.guests > 1 ? `guests` : `guest`
                      }`}
                    </p>
                    <p className="pr-4 font-normal text-sm leading-relaxed">
                      {!open
                        ? data?.description?.slice(0, 200) + "...."
                        : data?.description}
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
                      <p className="text-sm font-semibold">{data?.feature}</p>
                      <div>
                        {data?.guests === 1 || data?.guests === 2 ? (
                          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                            <MdOutlineKingBed className="text-3xl" /> x 1
                          </span>
                        ) : data?.guests === 3 ? (
                          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                            <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                            <MdOutlineSingleBed className="text-3xl" /> x1{" "}
                          </span>
                        ) : data?.guests === 4 ? (
                          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                            <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                          </span>
                        ) : (
                          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                            <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                            <MdOutlineSingleBed className="text-3xl" /> x1{" "}
                          </span>
                        )}
                      </div>
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
                        <span className="font-semibold text-xl">
                          $
                          {[data?.price]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </p>
                      <p className="flex justify-between font-light text-gray-700">
                        Total stay
                        <span className="font-semibold text-xl">
                          $
                          {[
                            data?.price * `${days === 0
                              ? `1`
                              : days}` * roomOptions.rooms,
                          ]
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </p>
                      <button
                        onClick={confirmBooking}
                        className="bg-green-700 w-full py-3 px-24 text-white font-semibold text-center border-none rounded-sm capitalize mt-9"
                      >
                        book now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleHotel;
