import React, { useEffect, useState } from "react";
import FixedHeader from "../../components/header/FixedHeader";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "./SearchInputHeader";
import { BiSort } from "react-icons/bi";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import image1 from "../../assets/images/heroe.jpg";
import image2 from "../../assets/images/heroe2.jpg";
import { AiFillHeart } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import ToggledSearchHeader from "./ToggledSearchHeader";
import Spinner from "../../components/Spinner/Spinner";
import SearchList from "../../components/searchList/SearchList";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import { setDestination } from "../../redux/searchStateSlice";
import { useTitle } from "../../hooks/useTitle";

const HotelsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useTitle(`Best luxury hotels in ${searchParams.get("query")}`)
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const { matches, setDropdownHeader, setFetchHotelStatus, fetchHotelStatus } =
    useMediaQueriesContext();
    console.log(searchParams.get("query"));
  const location = useLocation();
  // console.log(location.search.split(" "));
  let { roomOptions, destination } = useSelector((state) => state.searchState);

  const url = `http://localhost:8800/api/v1/hotels?country=${destination}`;
    // destination !== ""
    //   ? `http://localhost:8800/api/v1/hotels?country=${id}`
    //   : "http://localhost:8800/api/v1/hotels";

  const { data, loading, error } = useFetch(url);
  console.log(data);

  useEffect(() => {
    if(searchParams.get("query") && searchParams.get("query") !== "") dispatch(setDestination(searchParams.get("query")));
  }, [searchParams.get("query")]);

  let { days } = useDaysCalculate();

  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

  useEffect(() => {
    window.onpopstate = () => {
      setFetchHotelStatus("idle");
    };
  }, []);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      {/* {fetchHotelStatus === "pending" && loading === true  } */}
      {loading ? (
        <Spinner />
      ) : (
        <section
          className="flex justify-center"
          onClick={() => setDropdownHeader(false)}
        >
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
            <div className="mt-5" onClick={() => setDropdownHeader(false)}>
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
