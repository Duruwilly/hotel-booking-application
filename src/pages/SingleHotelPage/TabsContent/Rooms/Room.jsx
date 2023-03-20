import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import image1 from "../../../../assets/images/heroe.jpg";
import image2 from "../../../../assets/images/heroe2.jpg";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdOutlineSingleBed, MdOutlineKingBed } from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { format } from "date-fns";
import useDaysCalculate from "../../../../hooks/useDaysCalculate";
import useRoomsAvailabilityCheck from "../../../../utils/useRoomsAvailabilityCheck";
import { useMediaQueriesContext } from "../../../../context/MediaQueryContext";
import usePriceConversion from "../../../../utils/usePriceConversion";

const Room = ({ room, feature, addToBasket }) => {
  let { roomOptions, dateSearch } = useSelector((state) => state.searchState);
  let { days } = useDaysCalculate();
  let { isAvailable } = useRoomsAvailabilityCheck();

  const [activeOpen, setActiveOpen] = useState("");

  const [exchangedPrice, setExchangedPrice] = useState(1);
  const { convertPrice, fetchHotelStatus } = useMediaQueriesContext();
  const { convertPrices } = usePriceConversion();

  const sliderImg = [
    {
      src: image1,
    },
    {
      src: image2,
    },
  ];

  const [sliderNumber, setSliderNumber] = useState(0);

  const handleSlide = (dir) => {
    let newSliderNumber;
    if (dir === "l") {
      // newSliderNumber would return the last image in the array if sliderNumber is 0 else keep sliding left
      newSliderNumber =
        sliderNumber === 0 ? sliderImg.length - 1 : sliderNumber - 1;
    } else {
      // newSliderNumber would return the first image in the array if sliderNumber is equal to the last image else keep sliding right
      newSliderNumber =
        sliderNumber === sliderImg.length - 1 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSliderNumber);
  };

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  return (
    <>
      {isAvailable(room.roomNumbers) &&
      roomOptions.adult + roomOptions.children > room.maxPeople ? (
        <div
          className="py-4 text-center text-white font-light text-lg"
          style={{ background: "#758496" }}
        >
          <span>
            Avalable for your dates but you'll need to book more than one room
          </span>
        </div>
      ) : null}
      <div className="bg-white border border-gray-200 flex flex-col md:flex-row gap-6">
        <div style={{ flex: 3, position: "relative" }}>
          <img src={sliderImg[sliderNumber].src} alt="" className="w-full" />
          <button className="text-4xl absolute left-5 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
            <SlArrowLeft
              className=""
              onClick={() => {
                handleSlide("l");
              }}
            />
          </button>

          <button className="text-4xl absolute right-5 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
            <SlArrowRight
              onClick={() => {
                handleSlide("r");
              }}
            />
          </button>
        </div>
        <div style={{ flex: 2, position: "relative" }} className="pl-3 pb-3">
          <h1 className="pt-5 text-2xl font-semibold">{room?.title}</h1>
          <p className="py-3">
            {`${room?.maxPeople} ${room?.maxPeople > 1 ? `guests` : `guest`}`}
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
              <>
                <p className="text-red-800 font-semibold text-sm uppercase">
                  room unavailable
                </p>
                <span className="text-sm font-light">
                  Please select alternative dates above,{" "}
                  <span className="font-semibold text-sm">
                    {`${format(
                      new Date(dateSearch[0]?.startDate),
                      "dd MMM yyyy"
                    )} - ${format(
                      new Date(dateSearch[0]?.endDate),
                      "dd MMM yyyy"
                    )}`}{" "}
                  </span>
                </span>
              </>
            ) : // <p className="text-red-800 font-semibold">
            //   kindly select a date to see room availability
            // </p>
            null}
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
                {`${
                  convertPrice === "USD"
                    ? "$"
                    : convertPrice === "EUR"
                    ? "£"
                    : "₦"
                } ${[room?.price * exchangedPrice]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </span>
            </p>
            <p className="flex justify-between font-light text-gray-700">
              Total stay
              <span className="font-semibold text-xl">
                {/* $
                {[room?.price * days]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                {`${
                  convertPrice === "USD"
                    ? "$"
                    : convertPrice === "EUR"
                    ? "£"
                    : "₦"
                } ${[room?.price * days * exchangedPrice]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
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
    </>
  );
};

export default Room;
