import { useContext, createContext, useEffect, useState } from "react";

const MediaQueryMatches = createContext();

export const MediaQueryContext = ({ children }) => {
  const [dropdownHeader, setDropdownHeader] = useState(false);
  const [fetchHotelStatus, setFetchHotelStatus] = useState('idle')

  const [hotelDropdownHeader, setHotelDropdownHeader] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);

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
    setOpenDate(prev => !prev);
    setOpenRoomOptions(false);
  };

  const toggleRoomOptions = () => {
    setOpenRoomOptions(prev => !prev);
    setOpenDate(false);
  };


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
        
        
        steps,
        setSteps,
        list
      }}
    >
      {children}
    </MediaQueryMatches.Provider>
  );
};

export const useMediaQueriesContext = () => useContext(MediaQueryMatches);
