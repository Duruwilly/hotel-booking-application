import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import Button from "../../components/button/SearchButton";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { AiFillCloseCircle } from "react-icons/ai";

const ToggledSearchHeader = ({
  date,
  setDate,
  destination,
  setDestination,
  roomOptions,
  setRoomOptions,
}) => {
  const {
    hotelDropdownHeader,
    setHotelDropdownHeader,
    openDate,
    openRoomOptions,
    toggleDate,
    toggleRoomOptions,
    matches,
  } = useMediaQueriesContext();

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
    <>
      {!hotelDropdownHeader ? (
        <div
          className=""
          onClick={() => setHotelDropdownHeader(!hotelDropdownHeader)}
        >
          <div className="w-full ">
            <div className="h-16 bg-white flex items-center justify-between px-4 py-3 w-full">
              <div className="searchItem">
                <CiSearch className="searchIcons" />
                <input
                  type="text"
                  placeholder="Select destination"
                  className="pl-8 w-full placeholder:text-gray-600"
                  value={destination}
                />
              </div>
              <div className="flex justify-center items-center gap-6 px-4">
                <div className="searchItm">
                  <BsCalendarEvent className="searchIcon" />
                </div>
                <div className="searchItm">
                  <RxPerson className="searchIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary w-full py-3 px-4 transition">
          <div className="grid gap-3">
            <div className=" bg-white py- w-full">
              <div className="searchItem">
                <CiSearch className="searchIcons" />
                <input
                  type="text"
                  placeholder="Select destination"
                  className="pl-8 w-full placeholder:text-gray-600 py-4"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              {
                <div className="h- bg-white py- w-full">
                  <div className="searchItem">
                    <BsCalendarEvent className="searchIcons" />
                    <span
                      className="pl-8 w-full py-4 cursor-pointer"
                      onClick={toggleDate}
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
                </div>
              }
              <div className="h- bg-white py- w-full">
                <div className="searchItem">
                  <RxPerson className="searchIcons" />
                  <span
                    onClick={toggleRoomOptions}
                    className="pl-8 w-full py-[1.65rem] cursor-pointer"
                  >
                    {`${roomOptions.adult} ${
                      roomOptions.adult === 1 ? `adult` : `adults`
                    } . ${roomOptions.children} children . ${
                      roomOptions.rooms
                    } ${roomOptions.rooms === 1 ? `room` : `rooms`}`}
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
                            className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                            onClick={() => handleRoomOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* children */}
                      <div className="w-52 flex justify-between mt-3 py-2 px-4">
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
                            className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                            onClick={() => handleRoomOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* rooms */}
                      <div className="w-52 flex justify-between mt-3 py-2 px-4">
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
                            className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                            onClick={() => handleRoomOption("rooms", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button />
          </div>
        </div>
      )}
    </>
  );
};

export default ToggledSearchHeader;
