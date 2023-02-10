import { useContext, createContext, useEffect, useState } from "react";

const MediaQueryMatches = createContext();

export const MediaQueryContext = ({ children }) => {
  const [dropdownHeader, setDropdownHeader] = useState(false);

  const [hotelDropdownHeader, setHotelDropdownHeader] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [destination, setDestination] = useState('')

  const [steps, setSteps] = useState(0);
  const list = ["Choose", "confirm", "Pay"];

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [roomOptions, setRoomOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1,
  });

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

  const handleRoomOption = (name, operation) => {
    setRoomOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i" ? roomOptions[name] + 1 : roomOptions[name] - 1,
      };
    });
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
        handleRoomOption,
        roomOptions,
        setRoomOptions,
        date,
        setDate,
        destination,
        setDestination,
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
