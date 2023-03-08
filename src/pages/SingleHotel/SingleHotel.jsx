import React, { useEffect, useMemo, useRef, useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";

import { AiFillHeart } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import { useTitle } from "../../hooks/useTitle";
import Rooms from "../../components/HotelTabsContent/Rooms/Rooms";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useLikedItemCheck from "../../utils/useLikedItemCheck";
import { addItem, removeItem, setLikedBtnColor } from "../../redux/Favourites";
import axios from "axios";
import { setDestination } from "../../redux/searchStateSlice";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import Overview from "../../components/HotelTabsContent/HotelOverview/Overview";
import Location from "../../components/HotelTabsContent/HotelLocation/Location";
import Reviews from "../../components/HotelTabsContent/HotelReviews/Reviews";
import Photos from "../../components/HotelTabsContent/HotelPhotos/Photos";
import usePriceConversion from "../../utils/usePriceConversion";

const SingleHotel = () => {
  const locationID = useLocation();
  const id = locationID.pathname.split("/")[4];
  const { location } = useParams();
  const [singleHotel, setSinglehotel] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [openPhotosModal, setOpenPhotosModal] = useState(false);

  let { destination } = useSelector((state) => state.searchState);
  const dispatch = useDispatch();

  const [exchangedPrice, setExchangedPrice] = useState();
  const { convertPrices } = usePriceConversion();

  // using this to ge the hotel data that'd be passed to the liked items
  const url = `http://localhost:8800/api/v1/hotels?destination=${destination}`;
  const { data } = useFetch(url);
  // const { data } = useFetch();

  useTitle(
    `Rooms at ${singleHotel?.name} | ${singleHotel?.country}, ${singleHotel?.state} | WillTrip`
  );

  const toggleModal = () => {
    setOpenPhotosModal((state) => !state);
  };

  const {
    matches,
    setFetchHotelStatus,
    fetchHotelStatus,
    convertPrice,
    setDropdownHeader,
  } = useMediaQueriesContext();
  let { likedBtnnColor } = useSelector((state) => state.favourite);
  const { likedItemCheck } = useLikedItemCheck();

  // on re-search and returning back the hotel rooms page set the state to the location
  useEffect(() => {
    if (location && location !== "") dispatch(setDestination(location));
  }, []);

  // fetches a particular hotel based on the id
  useEffect(() => {
    const fetchHotelRooms = async () => {
      setFetchStatus("pending");
      setLoading(true);
      const url = `http://localhost:8800/api/v1/hotels/find/${id}`;
      try {
        const res = await axios.get(url);
        setFetchStatus("success");

        setSinglehotel(res.data.data);
      } catch (error) {
        setError(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchHotelRooms();
  }, []);

  // recalls the fuunction that fetches the hotels data on mount
  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

  // recalls the fuunction that fetches the hotels data on reload
  useEffect(() => {
    window.onpopstate = () => {
      setFetchHotelStatus("idle");
    };
  }, []);

  // liked funtions
  let allArr = likedItemCheck();
  const toggleLikedBtn = (itemId) => {
    const dataItem = data.responseData?.filter((item) => item?._id === itemId);
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
    window.matchMedia("(min-width: 770px)").matches
  );
  const [restTabModal, setRestTabModal] = useState(false);

  useEffect(() => {
    window
      .matchMedia("(min-width: 770px)")
      .addEventListener("change", (e) => setTabScreenMatches(e.matches));

    return () => {
      window
        .matchMedia("(min-width: 770px)")
        .removeEventListener("change", (e) => setTabScreenMatches(e.matches));
    };
  }, []);

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  const tabsList = [
    {
      panel: (
        <Overview
          feature={singleHotel?.feature}
          hotelName={singleHotel?.name}
        />
      ),
      name: "overview",
      value: "overview",
    },
    {
      panel: (
        <Photos openPhotosModal={openPhotosModal} toggleModal={toggleModal} />
      ),
      name: "photos",
      value: "photos",
    },
    {
      panel: <Reviews hotelName={singleHotel?.name} />,
      name: "reviews",
      value: "reviews",
    },
    {
      panel: <Location />,
      name: "location",
      value: "location",
    },
    {
      panel: (
        <Rooms
          hotelID={id}
          price={singleHotel?.price}
          hotelName={singleHotel?.name}
          hotelCountry={singleHotel?.destination}
          // hotelState={singleHotel?.state}
          feature={singleHotel?.feature}
        />
      ),
      name: "select a room",
      value: "select-a-room",
    },
  ];

  const tabsListBigScreenDisplay = useMemo(() => {
    return tabsList?.map((tab) => (
      <div key={tab?.value} className="relative text-gray-400 ">
        <button
          className={`${
            activeTab === tab?.value
              ? "singleHotelActive text-white cursor-pointer py-5 px-10"
              : " cursor-pointer py-5 px-10"
          } uppercase hover:text-white`}
          onClick={() => {
            setActiveTab(tab?.value);
            if (tab?.value === "photos") {
              toggleModal();
            }
          }}
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
    let smallScreenTab = [...tabsList];
    smallScreenTab.splice(1, 3);
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
    return tabsList?.find((tab) => tab?.value === activeTab)?.panel;
  }, [tabsList, activeTab, fetchStatus]);

  const restSmallScreenTabsList = useMemo(() => {
    let restSmallScreenTab = [...tabsList];
    let newArr = restSmallScreenTab.slice(0, 4);
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
            if (tab?.value === "photos") {
              toggleModal();
            }
          }}
        >
          {tab?.name}
        </button>
      </div>
    ));
  }, [tabsList, activeTab]);

  return (
    <>
      {matches ? <SearchInputHeader /> : <ToggledSearchHeader />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <section style={heroeBg} onClick={() => setDropdownHeader(false)}>
            <div className="flex justify-center">
              <div className="w-full max-w-screen-xl flex md:px- flex-col md:flex-row justify-between text-gray-100 absolute bottom-0">
                <div className="flex justify-center items-center gap-4">
                  <button
                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-2xl z- ${
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
                      {/* {singleHotel?.country + "," + " " + singleHotel?.state} */}
                      {singleHotel?.destination}
                    </p>
                    <p className="text-3xl">{singleHotel?.name}</p>
                  </div>
                </div>
                <div
                  className="flex flex-row justify-between md:flex-col items-center py-4 px-8"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <p className=" font-extralight">Price per night from</p>
                  <p className=" text-2xl">
                    {`${
                      convertPrice === "USD"
                        ? "$"
                        : convertPrice === "EUR"
                        ? "£"
                        : "₦"
                    } ${[singleHotel?.price * exchangedPrice]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
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
            <div
              className="w-full max-w-screen- mt-12 mb-16 px-"
              onClick={() => {
                setRestTabModal(false);
              }}
            >
              {activeTabPanel}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SingleHotel;
