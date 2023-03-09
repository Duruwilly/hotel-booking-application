import { useContext, createContext, useEffect, useState } from "react";

const MediaQueryMatches = createContext();

export const MediaQueryContext = ({ children }) => {
  const [dropdownHeader, setDropdownHeader] = useState(false);
  const [fetchHotelStatus, setFetchHotelStatus] = useState("idle");
  const [searchQueryDates, setSearchQueryDates] = useState([
    {
      searchQueryStartDates: undefined,
      searchQueryEndDates: undefined,
    },
  ]);

  const [hotelDropdownHeader, setHotelDropdownHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [convertPrice, setConvertPrice] = useState("USD");

  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [data, setData] = useState([]);
  const [sortPrice, setSortPrice] = useState("");

  const [date, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [steps, setSteps] = useState(0);
  const list = ["Choose", "confirm", "Pay"];

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1050px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1050px)")
      .addEventListener("change", (e) => setMatches(e.matches));

    return () => {
      window
        .matchMedia("(min-width: 1050px)")
        .removeEventListener("change", (e) => setMatches(e.matches));
    };
  }, []);

  const toggleDate = () => {
    setOpenDate((prev) => !prev);
    setOpenRoomOptions(false);
  };

  const toggleRoomOptions = () => {
    setOpenRoomOptions((prev) => !prev);
    setOpenDate(false);
  };

  const [queryState, setQueryState] = useState({
    pages: 1,
    query: "",
  });

  return (
    <MediaQueryMatches.Provider
      value={{
        matches,
        dropdownHeader,
        setDropdownHeader,
        toggleDate,
        toggleRoomOptions,
        setOpenRoomOptions,
        setOpenDate,
        openDate,
        openRoomOptions,
        hotelDropdownHeader,
        setHotelDropdownHeader,
        fetchHotelStatus,
        setFetchHotelStatus,
        date,
        setDates,
        steps,
        setSteps,
        list,
        searchQueryDates,
        setSearchQueryDates,
        loading,
        setLoading,
        error,
        setError,
        data,
        setData,
        sortPrice,
        setSortPrice,
        convertPrice,
        setConvertPrice,
        queryState,
        setQueryState,
      }}
    >
      {children}
    </MediaQueryMatches.Provider>
  );
};

export const useMediaQueriesContext = () => useContext(MediaQueryMatches);
