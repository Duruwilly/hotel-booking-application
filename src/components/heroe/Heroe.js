import React, { useEffect, useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { CiSearch } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import Button from "../button/SearchButton";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { AiFillCloseCircle } from "react-icons/ai";

const Heroe = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const [destination, setDestination] = useState('')

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

  const { matches } = useMediaQueriesContext();
  const [matcheState, setMatcheState] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatcheState(e.matches));
  }, []);

  const handleRoomOption = (name, operation) => {
    setRoomOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i" ? roomOptions[name] + 1 : roomOptions[name] - 1,
      };
    });
    console.log(roomOptions[name]);
  };

  const toggleDate = () => {
    setOpenDate(!openDate)
    setOpenRoomOptions(false)
  }

  const toggleRoomOptions = () => {
    setOpenRoomOptions(!openRoomOptions);
    setOpenDate(false)
  }

  return (
    <div style={heroeBg}>
      {matcheState ? (
        <p className="py-32 text-gray-100 text-center md:text-[2.2rem] lg:text-[2.5rem]">
          Helping you find and book the world's
          <br /> best hotels
        </p>
      ) : (
        <p className="py-32 text-gray-100 text-center text-xl">
          Helping you find and book the world's best hotels
        </p>
      )}

      {matches && (
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg">
            <div className="searchContainer">
              <div className="searchItem">
                <CiSearch className="searchIcons" />
                <input
                  type="text"
                  placeholder="Select destination"
                  className="pl-8 w-full placeholder:text-gray-600 py-[1.65rem]"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="searchItem">
                <BsCalendarEvent className="searchIcons" />
                <span
                  onClick={toggleDate}
                  className="pl-8 w-full py-[1.65rem] cursor-pointer"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <div>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
                    />
                    <button
                      className="py-1 px-9 text-white bg-red-900 date-btn"
                      onClick={toggleDate}
                    >
                      select date
                    </button>
                  </div>
                )}
              </div>
              <div className="searchItem">
                <RxPerson className="searchIcons" />
                <span
                  onClick={toggleRoomOptions}
                  className="pl-8 w-full py-[1.65rem] cursor-pointer"
                >
                  {`${roomOptions.adult} ${
                    roomOptions.adult === 1 ? `adult` : `adults`
                  } . ${roomOptions.children} children . ${roomOptions.rooms} ${
                    roomOptions.rooms === 1 ? `room` : `rooms`
                  }`}
                </span>
                {openRoomOptions && (
                  <div className="options">
                    <AiFillCloseCircle
                      className="w-6 h-6 cursor-pointer"
                      onClick={toggleRoomOptions}
                    />
                    {/* adult */}
                    <div className="w-52 flex justify-between mt-3 py-2 px-4">
                      <span className="text-black">Adult</span>
                      <div className="flex items-center gap-2 text-xs text-black">
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                          onClick={() => handleRoomOption("adult", "d")}
                          disabled={roomOptions.adult <= 1}
                        >
                          -
                        </button>
                        <span>{roomOptions.adult}</span>
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900"
                          onClick={() => handleRoomOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* children */}
                    <div className="w-52 flex justify-between py-2 px-4">
                      <span className="text-black">Children</span>
                      <div className="flex items-center gap-2 text-xs text-black">
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                          onClick={() => handleRoomOption("children", "d")}
                          disabled={roomOptions.children <= 0}
                        >
                          -
                        </button>
                        <span>{roomOptions.children}</span>
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900"
                          onClick={() => handleRoomOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* rooms */}
                    <div className="w-52 flex justify-between py-2 px-4">
                      <span className="text-black">Rooms</span>
                      <div className="flex items-center gap-2 text-xs text-black">
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                          onClick={() => handleRoomOption("rooms", "d")}
                          disabled={roomOptions.rooms <= 1}
                        >
                          -
                        </button>
                        <span>{roomOptions.rooms}</span>
                        <button
                          className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900"
                          onClick={() => handleRoomOption("rooms", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heroe;
