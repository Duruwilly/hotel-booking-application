import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAddHotelContext } from "../../context/AddhotelContext";
import RoomsListItems from "./RoomsListItems";

const HotelRoomsListings = ({ hotelId }) => {
  const { roomsData } = useAddHotelContext();

  return (
    <div className="mt-6 px-4">
      {roomsData?.responseData && roomsData?.responseData.length > 0 ? (
        <>
          <div className="px-4">
            <h1 className="border-b border-gray-500 uppercase font-semibold text-xl">
              hotel rooms
            </h1>
          </div>
          <div className="grid lg:grid-cols-3 wishlist-item gap-4 py-10 px-4">
            {roomsData?.responseData?.map((data) => (
              <div key={data?._id}>
                <RoomsListItems data={data} hotelId={hotelId} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default HotelRoomsListings;
