import React from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineKingBed, MdOutlineSingleBed } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import { removeItem } from "../../redux/basketSlice";

const BasketItem = (props) => {
  const {
    _id,
    name,
    country,
    state,
    title,
    feature,
    roomOptions,
    dateSearch,
    price,
    guests,
    quantity,
    hotelCountry,
    hotelState,
    hotelName,
  } = props;
  const navigate = useNavigate();
  //   let { destination } = useSelector((state) => state.searchState);

  //   const { setSteps } = useMediaQueriesContext();

  const { days } = useDaysCalculate();

  const dispatch = useDispatch();

  return (
    <>
      <div
        className="pb-1 pt-12"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span className="text-gray-400 uppercase text-xs font-light ">
          {hotelCountry + "," + " " + hotelState}
        </span>
        <h2 className="text-3xl font-light">{hotelName}</h2>
      </div>
      <div
        className="pt-6"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="font-semibold capitalize">room</p>
          <span className="font-semibold capitalize">{props[0].title}</span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">dates</p>
          <span className="font-extralight capitalize">
            {`${format(
              new Date(dateSearch[0].startDate),
              "dd MMMM yyyy"
            )} - ${format(new Date(dateSearch[0].endDate), "dd MMMM yyyy")}`}
          </span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">guests</p>
          <span className="font-extralight capitalize">{`${
            roomOptions.adult + roomOptions.children === 1
              ? `${roomOptions.adult + roomOptions.children} guests`
              : `${roomOptions.adult + roomOptions.children} guests`
          }`}</span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">beds</p>
          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
            {props[0].maxPeople === 1 || props[0].maxPeople === 2 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 1
              </span>
            ) : props[0].maxPeople === 3 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 1{" "}
                <MdOutlineSingleBed className="text-3xl" /> x1{" "}
              </span>
            ) : props[0].maxPeople === 4 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 2{" "}
              </span>
            ) : (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                <MdOutlineSingleBed className="text-3xl" /> x1{" "}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">includes</p>
          <span className="font-extralight capitalize">{feature}</span>
        </div>
        <div className="pb-1 flex justify-between items-center">
          <span className="text-gray-400 font-light capitalize">price</span>
          <p className="font-light text-gray-">
            $
            {[props[0].price * days * roomOptions.rooms * quantity]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            x {quantity}
          </p>
        </div>
      </div>
      <div
        className="py-3 text-right cursor-pointer"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span
          className="text-xl font-semibol text-red-700 cursor-pointer"
          onClick={() => dispatch(removeItem(props[0]._id))}
        >
          Remove
        </span>
        {/* <p className="text-3xl font-light">$1,204</p> */}
      </div>
      {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-12 justify-between items-center pt-6">
        <button className="capitalize relative w-full py-4 font-medium rounded-sm text-white bg-red-900 focus:outline-none tracking-widest text-xs">
          remove
        </button>
        
      </div> */}
    </>
  );
};

export default BasketItem;
