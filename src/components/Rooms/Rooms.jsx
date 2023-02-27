import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import image1 from "../../assets/images/heroe.jpg";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineSingleBed, MdOutlineKingBed } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/basketSlice";
import { useAuthContext } from "../../context/AuthContext";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import axios from "axios";
import useRoomsAvailabilityCheck, {
  isAvailable,
} from "../../utils/useRoomsAvailabilityCheck";
import PriceConversion from "../PriceConversion/PriceConversion";

const Rooms = ({ hotelID, hotelName, hotelCountry, hotelState, feature }) => {
  const { user } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [activeOpen, setActiveOpen] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRoom();
  }, [hotelID]);

  const fetchRoom = async () => {
    try {
      let url = `http://localhost:8800/api/v1/hotels/room/${hotelID}`;
      const res = await axios.get(url);
      // console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // let url = `http://localhost:8800/api/v1/hotels/room/${hotelID}`;

  //   const { data, loading, error } = useFetch(url);
  //   console.log(data, "at here too");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { roomOptions, dateSearch, searchQueryDates } = useSelector(
    (state) => state.searchState
  );
  let { days } = useDaysCalculate();
  let { isAvailable } = useRoomsAvailabilityCheck();

  const addToBasket = (id) => {
    const item = data.filter((itemId) => itemId._id === id);
    // console.log(item);
    if (user) {
      dispatch(
        addItem({
          ...item,
          roomOptions,
          dateSearch,
          days,
          hotelName,
          hotelCountry,
          hotelState,
          feature,
        })
      );
      navigate("/basket");
    } else {
      navigate("/login ");
      return;
    }
  };

  const toggleDescription = () => {
    // let roomsId = data.find((roomsid) => roomsid._id);
    // console.log(activeOpen);
    // if (roomsId._id === activeOpen) {
    // } else {
    //   setOpen(false);
    // }
    setOpen(!open);
  };

  //   useEffect(() => {
  //     setFetchHotelStatus("idle");
  //   }, [hotelID]);

  return (
    <>
      <PriceConversion />
      {data.map((room) => (
        <div className="mt-3" key={room._id}>
          {isAvailable(room.roomNumbers) &&
          roomOptions.adult + roomOptions.children > room.maxPeople ? (
            <div
              className="py-4 text-center text-white font-light text-lg"
              style={{ background: "#758496" }}
            >
              <span>
                Avalable for your dates but you'll need to book more than one
                room
              </span>
            </div>
          ) : null}
          <div className="bg-white border border-gray-200 flex flex-col md:flex-row gap-6">
            <div style={{ flex: 3, position: "relative" }}>
              <img src={image1} className="w-full" />
            </div>
            <div
              style={{ flex: 2, position: "relative" }}
              className="pl-3 pb-3"
            >
              <h1 className="pt-5 text-2xl font-semibold">{room?.title}</h1>
              <p className="py-3">
                {`${room?.maxPeople} ${
                  room?.maxPeople > 1 ? `guests` : `guest`
                }`}
              </p>
              <p className="pr-4 font-normal text-sm leading-relaxed">
                {room?._id !== activeOpen
                  ? room?.description?.slice(0, 200) + "...."
                  : room?.description}
              </p>
              <div
                className="flex items-center gap-3 mt-4 text-red-900 hover:text-red-700 cursor-pointer w-32"
                onClick={() => {
                  room?._id === activeOpen
                    ? setActiveOpen("")
                    : setActiveOpen(room?._id);
                }}
              >
                {room?._id !== activeOpen ? (
                  <>
                    <p className="text-sm">Read more</p>
                    <IoIosArrowDown />
                  </>
                ) : (
                  <>
                    <p className="text-sm">Read less</p>
                    <IoIosArrowUp />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 mt-3">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col justify-between">
                <p className="text-sm font-semibold">{feature}</p>
                <div>
                  {room?.maxPeople === 1 || room?.maxPeople === 2 ? (
                    <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                      <MdOutlineKingBed className="text-3xl" /> x 1
                    </span>
                  ) : room?.maxPeople === 3 ? (
                    <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                      <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                      <MdOutlineSingleBed className="text-3xl" /> x1{" "}
                    </span>
                  ) : room?.maxPeople === 4 ? (
                    <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                      <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                    </span>
                  ) : (
                    <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                      <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                      <MdOutlineSingleBed className="text-3xl" /> x1{" "}
                    </span>
                  )}
                </div>
                {!isAvailable(room.roomNumbers) ? (
                  <p className="text-red-800 capitalize">room unavailable</p>
                ) : (
                  <p className="text-red-800 font-semibold">
                    kindly select a date to see room availability
                  </p>
                )}
                <p className="text-sm">
                  For more details{" "}
                  <Link
                    to="/terms-and-condition"
                    className="font-bold hover:text-red-600"
                  >
                    see our terms and conditions
                  </Link>
                </p>
              </div>
              <div>
                <p className="flex justify-between items-center font-light text-gray-700 pt-3 md:pt-0">
                  Per night
                  <span className="font-semibold text-xl">
                    $
                    {[room?.price]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </p>
                <p className="flex justify-between font-light text-gray-700">
                  Total stay
                  <span className="font-semibold text-xl">
                    $
                    {[room?.price * days]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </p>
                <button
                  onClick={() => addToBasket(room._id)}
                  disabled={!isAvailable(room.roomNumbers)}
                  // onClick={() => !isAvailable(room.roomNumbers)}
                  className={`${
                    !isAvailable(room.roomNumbers)
                      ? `bg-green-700 disabled:opacity-70`
                      : `bg-green-700`
                  } w-full py-3 px-24 text-white font-semibold text-center border-none rounded-sm capitalize mt-9"
            `}
                >
                  book now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Rooms;
