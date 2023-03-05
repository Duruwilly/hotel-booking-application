import { format } from "date-fns";
import React from "react";
import { MdOutlineKingBed, MdOutlineSingleBed } from "react-icons/md";

const BookingSummaryCard = (props) => {
  const {
    _id,
    name,
    country,
    state,
    title,
    feature,
    roomOptions,
    dateSearch,
    // date,
    // searchQueryDates,
    price,
    guests,
    quantity,
    hotelCountry,
    hotelState,
    hotelName,
  } = props;
  //   console.log(props[0].roomNumbers);
  return (
    <div className="p-4 bg-white border border-gray-300 h-fit">
      <h2 className="text-3xl font-normal capitalize">{hotelName}</h2>
      <p className="capitalize pt-2 font-extralight">
        {hotelCountry + "," + " " + hotelState}
      </p>
      <div className="pt-6">
        <div className="flex pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            room
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {props[0].title}
          </span>
        </div>
        <div className="flex pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            dates
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {/* {`${format(
              new Date(date[0]?.startDate),
              "dd MMMM yyyy"
            )} - ${format(new Date(date[0]?.endDate), "dd MMMM yyyy")}`} */}
            {`${format(
              new Date(dateSearch[0]?.startDate),
              "dd MMMM yyyy"
            )} - ${format(
              new Date(dateSearch[0]?.endDate),
              "dd MMMM yyyy"
            )}`}
          </span>
        </div>
        <div className="flex  pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            guests
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {`${
              roomOptions.adult + roomOptions.children === 1
                ? `${roomOptions.adult + roomOptions.children} guests`
                : `${roomOptions.adult + roomOptions.children} guests`
            }`}
          </span>
        </div>
        <div className="flex pb-2">
          <p className="font-normal capitalize" style={{ flex: 1 }}>
            beds
          </p>
          <span
            className="flex justify-cente items-center gap-1 text-sm font-semibold"
            style={{ flex: 4 }}
          >
            {/* <MdOutlineKingBed className="text-3xl" />{" "}
            <span className="text-red-900">x1</span> */}
            {props[0].maxPeople === 1 || props[0].maxPeople === 2 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>
              </span>
            ) : props[0].maxPeople === 3 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>{" "}
                <MdOutlineSingleBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>{" "}
              </span>
            ) : props[0].maxPeople === 4 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x2</span>{" "}
              </span>
            ) : (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x2</span>{" "}
                <MdOutlineSingleBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>{" "}
              </span>
            )}
          </span>
        </div>
        <div className="flex  pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            includes
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {feature}
          </span>
        </div>
        <div className="border-y border-gray-300 py-7 text-center text-sm">
          <p className="text-red-800 capitalize font-semibold">free includes</p>
          <span>{feature}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;
