import React, { useEffect, useMemo, useState } from "react";
import { heroeBg } from "../../BgImageStyles/styles";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { AiFillHeart } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import { useTitle } from "../../hooks/useTitle";
import Rooms from "./TabsContent/Rooms/Rooms";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useLikedItemCheck from "../../utils/useLikedItemCheck";
import { setLikedBtnColor } from "../../redux/Favourites";
import axios from "axios";
import { setDestination } from "../../redux/searchStateSlice";
import SearchInputHeader from "../../components/PagesSearchHeaders/SearchInputHeader";
import ToggledSearchHeader from "../../components/PagesSearchHeaders/ToggledSearchHeader";
import Overview from "./TabsContent/HotelOverview/Overview";
import Location from "./TabsContent/HotelLocation/Location";
import Reviews from "./TabsContent/HotelReviews/Reviews";
import Photos from "./TabsContent/HotelPhotos/Photos";
import usePriceConversion from "../../utils/usePriceConversion";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useFavouriteContext } from "../../context/FavouriteItemsContext";
import NearbyHotelsPage from "../NearbyHotels/NearbyHotelsPage";

const SingleHotel = () => {
  const locationID = useLocation();
  const id = locationID.pathname.split("/")[4];
  const { location } = useParams();
  const [singleHotel, setSinglehotel] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [openPhotosModal, setOpenPhotosModal] = useState(false);
  const [errros, setErrors] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState();

  const heroeBg = {
    width: "100%",
    padding: "0",
    backgroundImage: `url(${singleHotel?.photos[0]?.url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    position: "relative",
  };

  let { destination } = useSelector((state) => state.searchState);
  const dispatch = useDispatch();

  const [exchangedPrice, setExchangedPrice] = useState(1);
  const { convertPrices } = usePriceConversion();

  // using this to ge the hotel data that'd be passed to the liked items
  const url = `${WILL_TRIP_BASE_URL}/hotels?destination=${destination}`;
  const { data } = useFetch(url);
  // const { data } = useFetch();

  useTitle(
    `Rooms at ${singleHotel?.name} | ${singleHotel?.destination} | WillTrip`
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
  const { likedItemCheck, addToFavourites, deleteFromFavourites } =
    useLikedItemCheck();
  const [allArr, setAllArr] = useState(likedItemCheck());
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { favouriteItems, setFavouriteFetchStatus, getFavouriteItems } =
    useFavouriteContext();

  // on re-search and returning back the hotel rooms page set the state to the location
  useEffect(() => {
    if (location && location !== "") dispatch(setDestination(location));
    // check this later. if it give a bug
  }, [location]);

  // fetches a particular hotel based on the id
  useEffect(() => {
    const fetchHotelRooms = async () => {
      setFetchStatus("pending");
      setLoading(true);
      const url = `${WILL_TRIP_BASE_URL}/hotels/find/${id}`;
      try {
        const res = await axios.get(url);
        setFetchStatus(res.data.status);

        setSinglehotel(res.data.data);
      } catch (error) {
        setError(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    if (fetchStatus === "idle") fetchHotelRooms();
  }, [fetchStatus]);

  // recalls the fuunction that fetches the hotels data on mount
  useEffect(() => {
    setFetchHotelStatus("idle");
  }, []);

  useEffect(() => {
    setFetchStatus("idle");
  }, []);

  // recalls the fuunction that fetches the hotels data on reload
  useEffect(() => {
    window.onpopstate = () => {
      setFetchHotelStatus("idle");
    };
  }, []);

  // const toggleFavouriteBtn = async (id) => {
  //   const item = data.responseData.filter((itemId) => itemId._id === id)[0];
  //   const { price, _id, feature, destination, name, photos } = item;
  //   const itemId = favouriteItems.filter((item) => item?.itemId === id)[0];

  //   if (!allArr.includes(id)) {
  //     let url = `${WILL_TRIP_BASE_URL}/favourites`;
  //     if (user) {
  //       try {
  //         await axios.post(url, {
  //           price,
  //           itemId: _id,
  //           feature,
  //           destination,
  //           name,
  //           photos,
  //           userID: user.id,
  //           quantity: 1,
  //         });
  //         setAllArr([...allArr, id]);
  //         setFavouriteFetchStatus("idle");
  //         getFavouriteItems(user);
  //         dispatch(setLikedBtnColor("text-red-600"));
  //       } catch (error) {
  //         return toast.error(error);
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   } else {
  //     let url = `${WILL_TRIP_BASE_URL}/favourites/${user?.id}/delete-favourite/${itemId._id}`;
  //     try {
  //       let response = await axios.delete(url, {
  //         headers: {
  //           Authorization: `Bearer ${user?.token}`,
  //         },
  //       });
  //       if (response.data.status === "success") {
  //         setFavouriteFetchStatus("idle");
  //         getFavouriteItems(user);
  //         setAllArr(allArr.filter((item) => item !== id));
  //       }
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  // };

  const toggleFavouriteBtn = async (id) => {
    const item = data.responseData.filter((itemId) => itemId._id === id)[0];
    const { price, _id, feature, destination, name, photos } = item;
    const itemId = favouriteItems.filter((item) => item?.itemId === id)[0];

    if (!allArr.includes(id)) {
      const response = await addToFavourites(
        user,
        id,
        price,
        _id,
        feature,
        destination,
        name,
        photos
      );
      if (response) {
        setAllArr([...allArr, id]);
        setFavouriteFetchStatus("idle");
        getFavouriteItems(user);
        dispatch(setLikedBtnColor("text-red-600"));
      } else {
        return toast.error("Unable to add to favourites.");
      }
    } else {
      const response = await deleteFromFavourites(user, itemId?._id);
      if (response) {
        setFavouriteFetchStatus("idle");
        getFavouriteItems(user);
        setAllArr(allArr.filter((item) => item !== id));
      } else {
        return toast.error("Unable to remove from favourites.");
      }
    }
  };

  // useEffect to update allArr when favouriteItems change
  useEffect(() => {
    setAllArr(likedItemCheck());
  }, [favouriteItems]);

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
      panel: <Overview singleHotel={singleHotel} />,
      name: "overview",
      value: "overview",
    },
    {
      panel: (
        <Photos
          openPhotosModal={openPhotosModal}
          toggleModal={toggleModal}
          singleHotel={singleHotel}
        />
      ),
      name: "photos",
      value: "photos",
    },
    {
      panel: (
        <Reviews
          singleHotel={singleHotel}
          hotelID={id}
          setFetchStatus={setFetchStatus}
        />
      ),
      name: "reviews",
      value: "reviews",
    },
    {
      panel: <Location singleHotel={singleHotel} />,
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
                    onClick={() => toggleFavouriteBtn(singleHotel?._id)}
                  >
                    <AiFillHeart className="" />
                  </button>
                  <div>
                    <p className="text-sm font-extralight">
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
                    } ${[Math.round(singleHotel?.price * exchangedPrice)]
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
          <NearbyHotelsPage
            location={location}
            convertPrice={convertPrice}
            exchangedPrice={exchangedPrice}
            currentHotelId={id}
          />
        </>
      )}
    </>
  );
};

export default SingleHotel;
