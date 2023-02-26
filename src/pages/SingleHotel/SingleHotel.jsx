import React, { useEffect, useMemo, useRef, useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import SearchInputHeader from "../HotelsList/SearchInputHeader";
import ToggledSearchHeader from "../HotelsList/ToggledSearchHeader";
import { AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import { useTitle } from "../../hooks/useTitle";
import Rooms from "../../components/Rooms/Rooms";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const SingleHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/v1/hotels/find/${id}`
  );

  useTitle(`Rooms at ${data?.country}, ${data?.state}`);

  const { setFetchHotelStatus, setDropdownHeader } = useMediaQueriesContext();

  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

  const { matches } = useMediaQueriesContext();

  const [activeTab, setActiveTab] = useState("select-a-room");
  const [tabScreenmatches, setTabScreenMatches] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 640px)")
      .addEventListener("change", (e) => setTabScreenMatches(e.matches));

    return () => {
      window
        .matchMedia("(min-width: 640px)")
        .removeEventListener("change", (e) => setTabScreenMatches(e.matches));
    };
  }, []);

  const [restTabModal, setRestTabModal] = useState(false);

  // console.log(searchQueryDates);
  // useEffect(() => {
  //   setSearchQueryDates([
  //     {
  //       searchQueryStartDates: new Date(),
  //       searchQueryEndDates: new Date(),
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //  window.onpopstate = () => {
  //   setSearchQueryDates([
  //     {
  //       searchQueryStartDates: new Date(),
  //       searchQueryEndDates: new Date(),
  //     },
  //   ]);
  //  }
  // }, [])

  const tabsList = useRef([
    {
      panel: <p>on it</p>,
      name: "overview",
      value: "overview",
    },
    {
      panel: <p>world</p>,
      name: "review",
      value: "review",
    },
    {
      panel: <p>hello</p>,
      name: "location",
      value: "location",
    },
    {
      panel: (
        <Rooms
          hotelID={id}
          price={data?.price}
          hotelName={data?.name}
          hotelCountry={data?.country}
          hotelState={data?.state}
          feature={data?.feature}
        />
      ),
      name: "select a room",
      value: "select-a-room",
    },
  ]);

  const tabsListBigScreenDisplay = useMemo(() => {
    return tabsList?.current?.map((tab) => (
      <div key={tab?.value} className="relative text-gray-400 ">
        <button
          className={`${
            activeTab === tab?.value
              ? "singleHotelActive text-white cursor-pointer py-5 px-10"
              : " cursor-pointer py-5 px-10"
          } uppercase`}
          onClick={() => setActiveTab(tab?.value)}
        >
          {tab?.name}
        </button>
        <span
          className="bg-gray"
          style={{
            display: tab?.value === activeTab ? "block" : "none",
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            right: "50%",
            width: "10px",
            height: "10px",
            transform: "rotate(45deg)",
          }}
        ></span>
      </div>
    ));
  }, [tabsList, activeTab]);

  const tabsListSmallScreenDisplay = useMemo(() => {
    let smallScreenTab = [...tabsList.current];
    smallScreenTab.splice(1, 2);
    // console.log(smallScreenTab.map((tab) => tab[0]));
    return smallScreenTab?.map((tab) => (
      <div key={tab?.value} className="relative text-gray-400 ">
        <button
          className={`${
            activeTab === tab?.value
              ? "singleHotelActive text-white cursor-pointer py-5 px-10"
              : " cursor-pointer py-5 px-10"
          } uppercase`}
        >
          {tab?.name}
        </button>
      </div>
    ));
  }, [tabsList, activeTab]);

  const activeTabPanel = useMemo(() => {
    return tabsList.current?.find((tab) => tab?.value === activeTab)?.panel;
  }, [tabsList, activeTab]);

  const restSmallScreenTabsList = useMemo(() => {
    let restSmallScreenTab = [...tabsList.current];
    let newArr = restSmallScreenTab.slice(0, 3);
    return newArr?.map((tab) => (
      <div key={tab?.value} className="relative text-gray-400 ">
        <button
          className={`${
            activeTab === tab?.value
              ? "singleHotelActive text-white cursor-pointer py-5 px- w-full"
              : " cursor-pointer py-5 px-10"
          } uppercase`}
          onClick={() => {
            setActiveTab(tab?.value);
            setRestTabModal(false);
          }}
        >
          {tab?.name}
        </button>
      </div>
    ));
  });

  console.log(tabsListSmallScreenDisplay[0].props.children.props.onClick);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section style={heroeBg} onClick={() => setDropdownHeader(false)}>
            <div className="flex justify-center">
              <div className="w-full max-w-screen-xl flex flex-col md:flex-row justify-between text-gray-100 absolute bottom-0">
                <div className="flex justify-center items-center gap-4">
                  <button
                    className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-2xl"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    <AiFillHeart className="" />
                  </button>
                  <div>
                    <p className="text-sm font-extralight">
                      {data?.country + "," + " " + data?.state}
                    </p>
                    <p className="text-3xl">{data?.name}</p>
                  </div>
                </div>
                <div
                  className="flex flex-row justify-between md:flex-col items-center py-4 px-8"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <p className=" font-extralight">Price per night</p>
                  <p className=" text-2xl">
                    $
                    {[data?.price]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center">
            <div className="relative w-full">
              <div className="bg-primary  w-full relative overflow-hidde overflow-x-hidde">
                {/* <ul className="text-gray-400 font-mediu text-xl flex justify-around py-">
                <li
                  className={
                    activeTab === "tab2"
                      ? "active cursor-pointer py-5 px-10"
                      : "cursor-pointer py-5 px-10"
                  }
                  onClick={() => toggleTab("tab2")}
                >
                  overview
                </li>
                <li
                  className={
                    activeTab === "tab3"
                      ? "active cursor-pointer py-5 px-10"
                      : "cursor-pointer py-5 px-10"
                  }
                  onClick={() => toggleTab("tab3")}
                >
                  location
                </li>
                <li
                  className={
                    activeTab === "tab4"
                      ? "active cursor-pointer py-5 px-10"
                      : "cursor-pointer py-5 px-10"
                  }
                  onClick={() => toggleTab("tab4")}
                >
                  reviews
                </li>
                <li
                  className={
                    activeTab === "tab1"
                      ? "active cursor-pointer py-5 px-10"
                      : "cursor-pointer py-5 px-10"
                  }
                  onClick={() => toggleTab("tab1")}
                >
                  select a room
                </li>
              </ul> */}
                <div className="text-gray-400 font-medium text-sm flex justify-around uppercase overflow-x-hidden">
                  {tabScreenmatches ? (
                    tabsListBigScreenDisplay
                  ) : (
                    <>
                      <div
                        onClick={() => setRestTabModal(true)}
                        className="flex justify-center items-center"
                      >
                        {tabsListSmallScreenDisplay[0]}
                        <MdOutlineKeyboardArrowDown className="text-3xl" />
                      </div>
                      <div
                        onClick={() => {
                          setActiveTab("select-a-room");
                          setRestTabModal(false);
                        }}
                      >
                        {tabsListSmallScreenDisplay[1]}
                      </div>
                    </>
                  )}
                </div>
                {restTabModal && (
                  <div className="absolute top-0 z-20 bg-primary w-2/4">
                    {restSmallScreenTabsList}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full max-w-screen-lg mt-12 mb-16 px-4">
              {/* {activeTab === "select-a-room" && <PriceConversion />} */}
              {activeTabPanel}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleHotel;
