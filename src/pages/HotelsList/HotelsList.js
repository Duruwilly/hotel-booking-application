import React, { useState } from "react";
import FixedHeader from "../../components/header/FixedHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "./SearchInputHeader";
import { BiSort } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../assets/images/heroe.jpg";
import image2 from "../../assets/images/heroe2.jpg";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import ToggledSearchHeader from "./ToggledSearchHeader";
import Spinner from "../../components/Spinner/Spinner";
import SearchList from "../../components/searchList/SearchList";
import useFetch from "../../hooks/useFetch";

const HotelsList = () => {
  const { matches, setHotelDropdownHeader } = useMediaQueriesContext();
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [roomOptions, setRoomOptions] = useState(location.state.roomOptions);

  const { data, loading, error, reFetch } = useFetch(
    destination !== ""
      ? `http://localhost:8800/api/v1/hotels?country=${destination}`
      : "http://localhost:8800/api/v1/hotels"
  );

  const Milliseconds_Per_Day = 1000 * 60 * 60 * 24;
  // subtract the starting date from the ending date and divide it by one whole day
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / Milliseconds_Per_Day);
    return diffDays;
  }

  const days = dayDifference(date[0]?.endDate, date[0]?.startDate);

  // if (location.pathname !== "/") {
  //   reFetch();
  // }

  return (
    <>
      {/* {matches ? (
        <SearchInputHeader
          date={date}
          setDate={setDate}
          destination={destination}
          setDestination={setDestination}
          roomOptions={roomOptions}
          setRoomOptions={setRoomOptions}
          reFetch={reFetch}
        />
      ) : (
        <ToggledSearchHeader
          date={date}
          setDate={setDate}
          destination={destination}
          setDestination={setDestination}
          roomOptions={roomOptions}
          setRoomOptions={setRoomOptions}
          reFetch={reFetch}
        />
      )} */}
      {loading ? (
        <Spinner />
      ) : (
        <section className="flex justify-center">
          <div className="w-full max-w-screen-xl py-5 px-4">
            <ul className="flex my-0 mx-auto list-none">
              <li className="uppercase text-xs border border-gray-900 bg-primary py-3 w-full text-white text-center list-none font-semibold">
                {data.length} hotels
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
              {data.length !== 0 ? (
                data.map((hotel) => (
                  <SearchList
                    key={hotel._id}
                    roomOptions={roomOptions}
                    hotel={hotel}
                    days={days}
                  />
                ))
              ) : (
                <p className="text-center">
                  No result based on your search location. Try another search
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HotelsList;
