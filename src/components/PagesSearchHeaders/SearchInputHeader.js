import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../button/SearchButton";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import {
  setDate,
  setDestination,
  handleRoomOption,
} from "../../redux/searchStateSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchInputHeader = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openRoomOptions, setOpenRoomOptions] = useState(false);
  const dispatch = useDispatch();
  let { roomOptions, destination, dateSearch, searchQueryDates } = useSelector(
    (state) => state.searchState
  );

  const { date, setDates } = useMediaQueriesContext();

  const toggleDate = () => {
    setOpenDate(!openDate);
    setOpenRoomOptions(false);
  };

  const toggleRoomOptions = () => {
    setOpenRoomOptions(!openRoomOptions);
    setOpenDate(false);
  };

  const [stickyClass, setStickyClass] = useState("relative");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 600
        ? setStickyClass("sticky top-24 left-0 z-20")
        : setStickyClass("top-0 sticky left-0 z-20");
    }
  };

  return (
    <div className={`w-full ${stickyClass}`}>
      <div className="w-full ">
        <div className="h-20 bg-white flex items-center justify-around py-3 border-b border-black w-full">
          <div className="searchItem">
            <CiSearch className="searchIcons" />
            <input
              type="text"
              placeholder="Select destination"
              className="pl-8 w-full placeholder:text-gray-600 py-[1.65rem]"
              onChange={(e) => {
                dispatch(setDestination(e.target.value));
              }}
              value={destination}
            />
          </div>
          <div className="searchItem">
            <BsCalendarEvent className="searchIcons" />
            <span
              onClick={toggleDate}
              className="pl-8 w-full py-[1.65rem] cursor-pointer"
            >
              {searchQueryDates[0].searchQueryStartDates === undefined &&
              searchQueryDates[0].searchQueryEndDates === undefined
                ? "check-in - check-out"
                : `${format(
                    new Date(dateSearch[0].startDate),
                    "dd MMM yyyy"
                  )} - ${format(
                    new Date(dateSearch[0].endDate),
                    "dd MMM yyyy"
                  )}`}
            </span>
            {openDate && (
              <div>
                {/* <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    dispatch(setDate({ ...item.selection }));
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: new Date(dateSearch[0].startDate),
                      endDate: new Date(dateSearch[0].endDate),
                      key: dateSearch[0].key,
                    },
                  ]}
                  className="date"
                  minDate={new Date()}
                /> */}
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    setDates([item.selection]);
                    dispatch(setDate({ ...item.selection }));
                  }}
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
              } - ${roomOptions.children} children`}
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
                      onClick={() =>
                        dispatch(
                          handleRoomOption({ name: "adult", operation: "d" })
                        )
                      }
                      disabled={roomOptions.adult <= 1}
                    >
                      -
                    </button>
                    <span>{roomOptions.adult}</span>
                    <button
                      className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900"
                      onClick={() =>
                        dispatch(
                          handleRoomOption({ name: "adult", operation: "i" })
                        )
                      }
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
                      onClick={() =>
                        dispatch(
                          handleRoomOption({ name: "children", operation: "d" })
                        )
                      }
                      disabled={roomOptions.children <= 0}
                    >
                      -
                    </button>
                    <span>{roomOptions.children}</span>
                    <button
                      className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900"
                      onClick={() =>
                        dispatch(
                          handleRoomOption({ name: "children", operation: "i" })
                        )
                      }
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
  );
};

export default SearchInputHeader;
