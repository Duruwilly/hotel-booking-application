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
import { useDispatch, useSelector } from "react-redux";
import useLikedItemCheck from "../../utils/useLikedItemCheck";
import { addItem, removeItem, setLikedBtnColor } from "../../redux/Favourites";
import axios from "axios";

const SingleHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const [singleHotel, setSinglehotel] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let { destination } = useSelector((state) => state.searchState);

  const url = `http://localhost:8800/api/v1/hotels?country=${destination}`;
  const { data } = useFetch(url);

  useTitle(`Rooms at ${data?.country}, ${data?.state}`);

  useEffect(() => {
    const fetchHotelRooms = async () => {
      setLoading(true);
      const url = `http://localhost:8800/api/v1/hotels/find/${id}`;
      try {
        const res = await axios.get(url);
        setSinglehotel(res.data.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    fetchHotelRooms();
  }, []);
  const { matches, setFetchHotelStatus, setDropdownHeader } =
    useMediaQueriesContext();

  const dispatch = useDispatch();
  let { likedBtnnColor } = useSelector((state) => state.favourite);
  const { likedItemCheck } = useLikedItemCheck();

  let allArr = likedItemCheck();
  const toggleLikedBtn = (itemId) => {
    const dataItem = data?.filter((item) => item?._id === itemId);
    if (allArr.includes(itemId)) {
      dispatch(removeItem(itemId));
      return;
    } else {
      dispatch(setLikedBtnColor("text-red-600"));
      dispatch(addItem(...dataItem));
      return;
    }
  };

  const [activeTab, setActiveTab] = useState("select-a-room");
  const [tabScreenmatches, setTabScreenMatches] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );
  const [restTabModal, setRestTabModal] = useState(false);

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

  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

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
          } uppercase hover:text-white`}
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
    return smallScreenTab?.map((tab) => (
      <div key={tab?.value} className="relative text-gray-400 ">
        <button
          className={`${
            activeTab === tab?.value
              ? "singleHotelActive text-white cursor-pointer py-5 px-10"
              : " cursor-pointer py-5 px-10"
          } uppercase hover:text-white`}
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
          } uppercase hover:text-white`}
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
                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-2xl z-10 ${
                      allArr.includes(singleHotel?._id)
                        ? likedBtnnColor
                        : `text-gray-200`
                    }`}
                    style={{ background: "rgba(0,0,0,0.4)" }}
                    onClick={() => toggleLikedBtn(singleHotel?._id)}
                  >
                    <AiFillHeart className="" />
                  </button>
                  <div>
                    <p className="text-sm font-extralight">
                      {singleHotel?.country + "," + " " + singleHotel?.state}
                    </p>
                    <p className="text-3xl">{singleHotel?.name}</p>
                  </div>
                </div>
                <div
                  className="flex flex-row justify-between md:flex-col items-center py-4 px-8"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <p className=" font-extralight">Price per night</p>
                  <p className=" text-2xl">
                    $
                    {[singleHotel?.price]
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
                <div className="text-gray-400 font-medium text-sm flex justify-around uppercase overflow-x-hidden overflow-y-hidden">
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
              {activeTabPanel}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleHotel;
