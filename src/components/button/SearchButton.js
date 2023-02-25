import { format } from "date-fns";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useSharedSearchContext } from "../../context/SearchContext";

const Button = () => {
  const { dispatch } = useSharedSearchContext();
  const { setFetchHotelStatus, setDropdownHeader, date } =
    useMediaQueriesContext();
  const navigate = useNavigate();
  let { destination, dateSearch } = useSelector((state) => state.searchState);

  let url = `/destinations/hotels?query=${destination}&date_from=${format(
    new Date(dateSearch[0]?.startDate),
    "dd-MM-yyyy"
  )}&date_to=${format(new Date(dateSearch[0]?.endDate), "dd-MM-yyyy")}`;
  // if (destination !== "") {
  //   url = `/destinations/${destination}/hotels`;
  // } else {
  //   url = "/destinations/hotels";
  // }

  const handleSearch = () => {
    setFetchHotelStatus("idle");
    setDropdownHeader(false);
    navigate(url);
  };

  return (
    <button
      onClick={handleSearch}
      disabled={destination === ""}
      className={`${
        destination === "" ? "bg-red-900 disabled:opacity-70" : "bg-red-900"
      } py-4 px-9 uppercase text-white text-xs font-semibold rounded-[3px] cursor-pointer`}
    >
      search
    </button>
  );
};

export default Button;
