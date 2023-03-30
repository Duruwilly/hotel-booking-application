import React, { useEffect } from "react";
import EditHotelModal from "./component/HotelListings/EditHotelModal";
import Listings from "./component/HotelListings/Listings";
import AddRooms from "./component/RoomsListings/AddRooms";
import EditRoomsList from "./component/RoomsListings/EditRoomsList";
import { useAddHotelContext } from "./context/AddhotelContext";
import { useTitle } from "../../../hooks/useTitle";
import CreateHotelForm from "./component/HotelListings/AddHotel";

const MerchantHomePage = () => {
  const { toggleModal, initializeState, clearState, user } =
    useAddHotelContext();
  useTitle("Merchant home page | WillTrip");

  useEffect(() => {
    initializeState();

    return () => {
      clearState();
    };
  }, [user?.id]);

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-xl px-4 py-6">
          <div>
            <button
              className="bg-secondary text-white rounded-md float-lef py-2 capitalize w- px-6"
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
      <EditHotelModal />
      <EditRoomsList />
    </>
  );
};

export default MerchantHomePage;
