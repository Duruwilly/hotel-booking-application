import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../assets/images/heroe.jpg";
import image2 from "../../assets/images/heroe2.jpg";
import { AiFillHeart } from "react-icons/ai";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setLikedBtnColor } from "../../redux/Favourites";
import useLikedItemCheck from "../../utils/useLikedItemCheck";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import usePriceConversion from "../../utils/usePriceConversion";

const SearchList = ({ roomOptions, hotel, days, data, exchangedPrice,  }) => {
  const { convertPrice } = useMediaQueriesContext();
  const dispatch = useDispatch();
  let { likedBtnnColor } = useSelector((state) => state.favourite);
  const { likedItemCheck } = useLikedItemCheck();

  let allArr = likedItemCheck();
  const toggleLikedBtn = (itemId) => {
    const dataItem = data.filter((item) => item?._id === itemId);
    if (allArr.includes(itemId)) {
      dispatch(removeItem(itemId));
      return;
    } else {
      dispatch(setLikedBtnColor("text-red-600"));
      dispatch(addItem(...dataItem));
      return;
    }
  };

  const sliderImg = [
    {
      src: image1,
    },
    {
      src: image2,
    },
  ];

  const [sliderNumber, setSliderNumber] = useState(0);

  const handleMove = (dir) => {
    let newSliderNumber;

    if (dir === "l") {
      // newSliderNumber would return the last image in the array if sliderNumber is 0 else we'll keep sliding left
      newSliderNumber =
        sliderNumber === 0 ? sliderImg.length - 1 : sliderNumber - 1;
    } else {
      // if sliderNumber is equal to 1, show the first image else keep sliding right
      newSliderNumber =
        sliderNumber === sliderImg.length - 1 ? 0 : sliderNumber + 1;
    }

    setSliderNumber(newSliderNumber);
  };

  return (
    <div className="bg-white border border-gray-200 flex flex-col hotelList-card-container mb-7">
      <div style={{ flex: 3, position: "relative" }}>
        <Link to={`/hotel/${hotel.name}/${hotel.destination}/${hotel._id}`}>
          <div>
            <img src={sliderImg[sliderNumber].src} alt="" />
          </div>
        </Link>

        <button className="text-4xl absolute left-5 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
          <SlArrowLeft className="" onClick={() => handleMove("l")} />
        </button>

        <button className="text-4xl absolute right-5 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
          <SlArrowRight onClick={() => handleMove("r")} />
        </button>

        <div className="absolute top-0 right-0">
          <button
            className={`rounded-full w-12 h-12 p-0 border-0 inline-flex items-center justify-center text-3xl ${
              allArr.includes(hotel._id) ? likedBtnnColor : `text-gray-200`
            }`}
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <AiFillHeart
              className=""
              onClick={() => toggleLikedBtn(hotel._id)}
            />
          </button>
        </div>
      </div>
      <div
        style={{ flex: 2, position: "relative" }}
        className="flex flex-col justify-start"
      >
        <h2 className="text-gray-400 uppercase text-sm font-light pt-5 mr-16">
          {/* {hotel.country + "," + " " + hotel.state} */}
          {hotel?.destination}
        </h2>
        <h1 className="font-semibold capitalize text-xl py-2">{hotel.name}</h1>
        <div className="pr-4">
          <div
            className="font-ligh py-3 text-center px-2"
            style={{ background: "#eee", fontSize: ".9rem" }}
          >
            {/* {`${
            roomOptions.adult + roomOptions.children < hotel.guests
            ? `Sleeps up to ${hotel.guests} guests`
            : `Sleeps ${hotel.guests} guests`
          }`} */}
            <span className="text-red-900 font-semibold capitalize">
              Free includes
            </span>{" "}
            {hotel.feature}
          </div>
        </div>
        <div className="price-container">
          <div className="py-4 font-semibold text-sm">
            <span className="text-green-600">Best-price guarantee</span>
            <p className="text-red-600 font-semibold">
              free cancellation, payment refundable
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {/* for {days === 0 ? `1` : days} nights */}
              Price per night from
            </span>
            <p className="font-bold text-lg pb-3">
              {`${
                convertPrice === "USD"
                  ? "$"
                  : convertPrice === "EUR"
                  ? "£"
                  : "₦"
              } ${[hotel.price * exchangedPrice]
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </p>
            <Link
              to={`/hotel/${hotel.name}/${hotel.country}/${hotel._id}`}
              className="bg-red-800 w-full py-2 px-8 text-white font-semibold text-center border-none rounded-sm capitalize"
            >
              select room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
