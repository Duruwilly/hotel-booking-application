import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsCalendarEvent } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import Button from "../button/SearchButton";
import { DateRange } from "react-date-range";
import { format, parse, parseISO } from "date-fns";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setDestination,
  handleRoomOption,
} from "../../redux/searchStateSlice";

const FixedHeader = () => {
  const {
    dropdownHeader,
    setDropdownHeader,
    openDate,
    openRoomOptions,
    toggleDate,
    toggleRoomOptions,
    matches,
    date,
    setDates,
  } = useMediaQueriesContext();
  let { roomOptions, destination, dateSearch, searchQueryDates } = useSelector(
    (state) => state.searchState
  );
  const dispatch = useDispatch();

  return (
    <>
      {!dropdownHeader ? (
        <div className="" onClick={() => setDropdownHeader(!dropdownHeader)}>
          <div className="w-full ">
            <div className="h-16 bg-white flex items-center justify-between px-4 py-3 w-full">
              <div className="searchItem">
                <CiSearch className="searchIcons" />
                <input
                  type="text"
                  placeholder="Select destination"
                  className="pl-8 w-full placeholder:text-gray-600"
                  value={destination}
                  readOnly
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
                  onChange={(e) => {
                    dispatch(setDestination(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
              {
                <div className="h- bg-white py- w-full">
                  <div className="searchItem">
                    <BsCalendarEvent className="searchIcons" />
                    <span
                      onClick={toggleDate}
                      className="pl-8 w-full py-[1.65rem] cursor-pointer"
                    >
                      {/* {`${format(
                        new Date(dateSearch[0].startDate),
                        "dd/MM/yyyy"
                      )} to ${format(
                        new Date(dateSearch[0].endDate),
                        "dd/MM/yyyy"
                      )}`} */}
                      {/* {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                        date[0].endDate,
                        "dd/MM/yyyy"
                      )}`} */}
                      {searchQueryDates[0].searchQueryStartDates ===
                        undefined &&
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
                                handleRoomOption({
                                  name: "adult",
                                  operation: "d",
                                })
                              )
                            }
                            disabled={roomOptions.adult <= 1}
                          >
                            -
                          </button>
                          <span>{roomOptions.adult}</span>
                          <button
                            className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                            onClick={() =>
                              dispatch(
                                handleRoomOption({
                                  name: "adult",
                                  operation: "i",
                                })
                              )
                            }
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
                            onClick={() =>
                              dispatch(
                                handleRoomOption({
                                  name: "children",
                                  operation: "d",
                                })
                              )
                            }
                            disabled={roomOptions.children <= 0}
                          >
                            -
                          </button>
                          <span>{roomOptions.children}</span>
                          <button
                            className="w-7 h-7 cursor-pointer text-gray-900 border border-gray-900 btn-disabled"
                            onClick={() =>
                              dispatch(
                                handleRoomOption({
                                  name: "children",
                                  operation: "i",
                                })
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
              </div>
            </div>
            <Button />
          </div>
        </div>
      )}
    </>
  );
};

export default FixedHeader;
