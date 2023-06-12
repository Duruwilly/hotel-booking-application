import { format } from "date-fns";
import React from "react";
import { MdOutlineKingBed, MdOutlineSingleBed } from "react-icons/md";

const BookingSummaryCard = (props) => {
  const {
    title,
    feature,
    roomOptions,
    dateSearch,
    hotelCountry,
    hotelName,
    maxPeople,
    isBooked,
  } = props;
  return (
    <div className="p-4 bg-white border border-gray-300 h-fit">
      <h2 className="text-3xl font-normal capitalize">{hotelName}</h2>
      <p className="capitalize pt-2 font-extralight">{hotelCountry}</p>
      <div className="pt-6">
        <div className="flex pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            room
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {title}
          </span>
        </div>
        <div className="flex pb-2">
          <p className="font-normal text-base capitalize" style={{ flex: 1 }}>
            dates
          </p>
          <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
            {`${format(
              new Date(dateSearch[0]?.startDate),
              "dd MMMM yyyy"
            )} - ${format(new Date(dateSearch[0]?.endDate), "dd MMMM yyyy")}`}
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
            {maxPeople === 1 || maxPeople === 2 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>
              </span>
            ) : maxPeople === 3 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>{" "}
                <MdOutlineSingleBed className="text-3xl" />{" "}
                <span className="text-red-900">x1</span>{" "}
              </span>
            ) : maxPeople === 4 ? (
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
        {/* {isBooked && (
          <p className="text-red-800 font-light text-sm">
            room has already been booked. kindly remove this room to proceed or
            select another room or date
          </p>
        )} */}
      </div>
    </div>
  );
};

export default BookingSummaryCard;
