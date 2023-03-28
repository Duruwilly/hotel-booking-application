import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import hotelbg from "../../../../../assets/images/heroe.jpg";
import { WILL_TRIP_BASE_URL } from "../../../../../constants/base-urls";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useAddHotelContext } from "../../context/AddhotelContext";

const RoomsListItems = ({ data, hotelId }) => {
  const { initializeState, toggleEditRoomModal, setEditRoomState } =
    useAddHotelContext();
  const { user } = useAuthContext();
  const hotelBg = {
    width: "100%",
    padding: "0",
    backgroundImage: `url(${hotelbg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    position: "relative",
  };

  const deleteRoom = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/rooms/${id}/merchant/${hotelId}`;
    try {
      let response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.data.status === "success") {
        initializeState();
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div style={hotelBg} className="relative">
      <div className="heroe-overlay flex justify-center items-center flex-col">
        <div className="flex justify-center gap-3 items-cente">
          <Link to={`/view-room/${data.title}/${data._id}`} className="">
            <button className="bg-green-800 w-ful py-4 px-5 uppercase text-xs text-white">
              view hotel
            </button>
          </Link>
          <button
            className="bg-secondary w-ful py-4 px-5 uppercase text-xs text-white"
            onClick={() => {
              toggleEditRoomModal();
              setEditRoomState(data);
            }}
          >
            edit hotel
          </button>
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-primary w-full py-4 px-5 uppercase text-xs text-white"
            onClick={() => deleteRoom(data._id)}
          >
            delete room
          </button>
        </div>
        <div
          className="py-4 absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-lg tracking-widest font-light"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <p>{data?.title} room</p>
        </div>
      </div>
    </div>
  );
};

export default RoomsListItems;
