import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/basketSlice";
import { useTitle } from "../../hooks/useTitle";
import Rooms from "../../components/Rooms/Rooms";

const SingleHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );
  console.log({ hello: data.country, hi: data.state });

  useTitle(`Rooms at ${data?.country}, ${data?.state}`);

  const { setFetchHotelStatus, setDropdownHeader } = useMediaQueriesContext();

  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

  const { matches } = useMediaQueriesContext();

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section style={heroeBg} onClick={() => setDropdownHeader(false)}>
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
              <Rooms
                hotelID={id}
                price={data?.price}
                hotelName={data?.name}
                hotelCountry={data?.country}
                hotelState={data?.state}
                feature={data?.feature}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleHotel;
