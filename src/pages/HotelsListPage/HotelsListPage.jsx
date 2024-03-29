import React, { useEffect } from "react";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useSearchParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import Spinner from "../../components/Spinner/Spinner";
import SearchList from "./component/SearchList";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import {
  setDestination,
  setSearchQueryDates,
} from "../../redux/searchStateSlice";
import { useTitle } from "../../hooks/useTitle";
import { useState } from "react";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import Modal from "../../components/Modal/Modal";
import Map from "../../components/Map/Map";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import usePriceConversion from "../../utils/usePriceConversion";
import { Paginator } from "../../components/Paginator";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";

const HotelsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useTitle(`Best luxury hotels in ${searchParams.get("query")}`);
  // const { id } = useParams();
  const dispatch = useDispatch();
  const {
    matches,
    setDropdownHeader,
    setFetchHotelStatus,
    fetchHotelStatus,
    date,
    sortPrice,
    setSortPrice,
    convertPrice,
    setQueryState,
    queryState,
  } = useMediaQueriesContext();
  let { roomOptions } = useSelector((state) => state.searchState);

  const [openMapModal, setOpenMapModal] = useState(false);
  const [exchangedPrice, setExchangedPrice] = useState(1);
  const { convertPrices } = usePriceConversion();

  const toggleModal = () => {
    setOpenMapModal((state) => !state);
  };
  // console.log(destination);

  let page = searchParams.get("page") ?? 1;
  let currentPage = Number(page);
  const url = `${WILL_TRIP_BASE_URL}/hotels?destination=${searchParams.get(
    "query"
  )}&page=${currentPage}`;

  const { data, loading, error } = useFetch(url);
  // console.log(data);

  // const { data } = useFetch();

  useEffect(() => {
    if (searchParams.get("query") && searchParams.get("query") !== "")
      dispatch(setDestination(searchParams.get("query")));
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

  useEffect(() => {
    setQueryState((state) => {
      return {
        ...state,
        query: `query=${searchParams.get("query")}&date_from=${searchParams.get(
          "date_from"
        )}&date_to=${searchParams.get("date_to")}`,
      };
    });
  }, []);

  // getting the date from the query
  const startDateString = searchParams.get("date_from");
  const [startDay, startMonth, startYear] = startDateString
    .split("-")
    .map(Number);
  const endDateString = searchParams.get("date_to");
  const [endDay, endMonth, endYear] = endDateString.split("-").map(Number);

  const startDate = new Date(startYear, startMonth - 1, startDay, 21, 16, 45);
  const endDate = new Date(endYear, endMonth - 1, endDay, 21, 16, 45);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedStartDate = startDate.toLocaleString("en-US", options);
  const formattedEndDate = endDate.toLocaleString("en-US", options);
  // console.log(formattedEndDate);

  // The search button navigate to this page passing the date, and location query strings and when we click on the search button without selecting a date, it is going to use the current date and send it to the query strings.

  // when we navigate to this page we dispatch the date from the query strings to our redux state and persist it there.
  useEffect(() => {
    dispatch(
      setSearchQueryDates({
        searchQueryStartDates: new Date(formattedStartDate),
        searchQueryEndDates: new Date(formattedEndDate),
      })
    );
  }, [searchParams.get("date_from"), searchParams.get("date_to")]);

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice]);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      {/* {fetchHotelStatus === "pending" && loading === true  } */}
      {loading ? (
        <Spinner />
      ) : (
        <section
          className="flex justify-center flex-1"
          onClick={() => setDropdownHeader(false)}
        >
          <div className="w-full max-w-screen-xl py-5 px-4">
            <div className="fle justify-betwee items-cente">
              <ul className="flex my-0 mx-auto list-none relative">
                <li className="uppercase text-xs border border-gray-900 bg-primary py-3 w-full text-white text-center list-none font-semibold">
                  {data.responseData.length} hotels
                </li>
                <select
                  value={sortPrice}
                  onChange={(e) => {
                    setSortPrice(e.target.value);
                    setFetchHotelStatus("idle");
                  }}
                  className="uppercase text-xs border bg-transparent border-gray-900 text-black py-3 px- w-full text-center list-none font-semibold cursor-pointer"
                >
                  <option>sort prices</option>
                  <option value="low-to-high">price low to high</option>
                  <option value="high-to-low">price high to low</option>
                </select>

                <li
                  className="uppercase text-xs border border-gray-900 py-3 px- w-full text-black text-center list-none font-semibold cursor-pointer"
                  onClick={() => toggleModal()}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaMapMarkerAlt />
                    view on map
                  </div>
                </li>
                <span
                  className="bg-primary"
                  style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-7px",
                    left: "10%",
                    width: "15px",
                    height: "15px",
                    transform: "rotate(45deg)",
                  }}
                ></span>
              </ul>

              <PriceConversion />

              {/* <ul className="flex my-0 mx-auto relative">
                <li className="uppercase text-xs border border-gray-900 bg-primary text-white text-center list-none font-semibold outline-none py-3 px-6">
                  {data.length} hotels
                </li>
                <select
                  value={sortPrice}
                  onChange={(e) => {
                    setSortPrice(e.target.value);
                    setFetchHotelStatus("idle");
                  }}
                  className="uppercase text-xs border bg-transparent border-gray-900 text-black py- px- w-ful text-center font-semibold cursor-pointer outline-none py-3 px-6"
                >
                  <option>sort prices</option>
                  <option value="low-to-high">price low to high</option>
                  <option value="high-to-low">price high to low</option>
                </select>
                <li
                  className="uppercase text-xs border border-gray-900 py-3 px-6 w-ful text-black text-center list-none font-semibold cursor-pointer"
                  onClick={() => toggleModal()}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FaMapMarkerAlt />
                    view on map
                  </div>
                </li>
                <span
                  className="bg-primary"
                  style={{
                    display: "block",
                    position: "absolute",
                    bottom: "-7px",
                    left: "10%",
                    width: "15px",
                    height: "15px",
                    transform: "rotate(45deg)",
                  }}
                ></span>
              </ul> */}
              {/* <PriceConversion /> */}
            </div>
            <div className="mt-5" onClick={() => setDropdownHeader(false)}>
              {fetchHotelStatus === "success" &&
                data.responseData.map((hotel) => (
                  <div key={hotel._id}>
                    <SearchList
                      key={hotel._id}
                      roomOptions={roomOptions}
                      hotel={hotel}
                      days={days}
                      data={data.responseData}
                      exchangedPrice={exchangedPrice}
                      hotelLocation={searchParams.get("query")}
                      searchFrom={searchParams.get("date_from")}
                      searchTo={searchParams.get("date_to")}
                    />
                  </div>
                ))}
              {data.responseData.length === 0 && (
                <p className="text-center">
                  No result based on your search location. Try another search
                </p>
              )}
              {/* {data.length !== 0 ? (
              data.map((hotel) => (
                <SearchList
                  key={hotel._id}
                  roomOptions={roomOptions}
                  hotel={hotel}
                  days={days}
                  data={data}
                />
              ))
            ) : (
              <p className="text-center">
                No result based on your search location. Try another search
              </p>
            )} */}
            </div>
          </div>
        </section>
      )}
      {openMapModal && (
        <Modal>
          <Map
            setOpenMapModal={setOpenMapModal}
            destination={searchParams.get("query")}
          />
        </Modal>
      )}
      {data.responseData && data.responseData.length > 0 ? (
        <nav className="custom-paginator">
          <ul>
            <Paginator
              currentPage={currentPage}
              pages={data.pages}
              url={"/destinations/hotels"}
              query={queryState.query}
            />
          </ul>
        </nav>
      ) : null}
    </>
  );
};

export default HotelsList;
