import React, { useEffect } from "react";
import CreateHotelForm from "./component/AddHotel";
import Listings from "./component/HotelListings/Listings";
import AddRooms from "./component/RoomsListings/AddRooms";
import { useAddHotelContext } from "./context/AddhotelContext";

const MerchantHomePage = () => {
  const { toggleModal, initializeState, clearState, user } =
    useAddHotelContext();

  useEffect(() => {
    initializeState();

    return () => {
      clearState();
    };
  }, [user?.id]);

  return (
    <>
      <section className="flex justify-center items-cente">
        <div className="w-full max-w-screen-xl px-4 py-6">
          <div>
            <button
              className="bg-secondary text-white rounded-md float-lef py-2 capitalize w-1/6"
              style={{ boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.9)" }}
              onClick={() => toggleModal()}
            >
              add hotel
            </button>
          </div>
          <Listings />
        </div>
      </section>
      <CreateHotelForm />
      <AddRooms />
    </>
  );
};

export default MerchantHomePage;
