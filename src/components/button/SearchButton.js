import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useSharedSearchContext } from "../../context/SearchContext";
import SearchButtonSpinner from "../Spinner/SearchButtonSpinner";

const Button = () => {
  const { dispatch } = useSharedSearchContext();
  const {
    setFetchHotelStatus,
    setDropdownHeader,
    setLoading,
    queryState,
    setQueryState,
  } = useMediaQueriesContext();
  const navigate = useNavigate();
  let { destination, dateSearch } = useSelector((state) => state.searchState);

  let queryStrings = `query=${destination}&date_from=${format(
    new Date(dateSearch[0]?.startDate),
    "dd-MM-yyyy"
  )}&date_to=${format(new Date(dateSearch[0]?.endDate), "dd-MM-yyyy")}`;

  let url = `/destinations/hotels?${queryStrings}`;
  // if (destination !== "") {
  //   url = `/destinations/${destination}/hotels`;
  // } else {
  //   url = "/destinations/hotels";
  // }

  // const initializeHotelSearch = () => {
  //   fetchHotels();
  // };

  const handleSearch = () => {
    setLoading(true);
    setFetchHotelStatus("idle");
    setDropdownHeader(false);
    navigate(url);
    // if (!loading) {
    //   setTimeout(() => {
    //   }, 3000);
    // }
    setQueryState((state) => {
      return { ...state, query: queryStrings };
    });
  };

  // ${loading ? "bg-red-900 opacity-70" : ""}

  return (
    <button
      onClick={handleSearch}
      disabled={destination === ""}
      className={`${
        destination === "" ? "bg-red-900 disabled:opacity-70" : "bg-red-900"
      }  py-4 px-9 uppercase text-white text-xs font-semibold rounded-[3px] cursor-pointer`}
    >
      {/* {loading ? <SearchButtonSpinner /> : "search"} */}
      Search
    </button>
  );
};

export default Button;
