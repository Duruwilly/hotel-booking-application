import { useContext, createContext, useEffect, useState } from "react";

const MediaQueryMatches = createContext();

export const MediaQueryContext = ({ children }) => {
  const [dropdownHeader, setDropDownHeader] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);

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
    setOpenDate(!openDate);
    setOpenRoomOptions(false);
  };

  const toggleRoomOptions = () => {
    setOpenRoomOptions(!openRoomOptions);
    setOpenDate(false);
  };

  return (
    <MediaQueryMatches.Provider
      value={{
        matches,
        dropdownHeader,
        setDropDownHeader,
        toggleDate,
        toggleRoomOptions,
        setOpenRoomOptions,
        setOpenDate,
        openDate,
        openRoomOptions
      }}
    >
      {children}
    </MediaQueryMatches.Provider>
  );
};

export const useMediaQueriesContext = () => useContext(MediaQueryMatches);
