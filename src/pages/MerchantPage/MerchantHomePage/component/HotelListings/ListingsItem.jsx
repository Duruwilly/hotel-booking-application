import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import hotelbg from "../../../../../assets/images/heroe.jpg";
import { useAddHotelContext } from "../../context/AddhotelContext";
import HotelRoomsListings from "../RoomsListings/HotelRoomsListings";
import moment from "moment";

const ListingsItem = ({ data }) => {
  const {
    deleteHotel,
    addRoomsModal,
    setGetHotelId,
    toggleEditHotelModal,
    setEditHotelState,
  } = useAddHotelContext();

  const hotelBg = {
    width: "100%",
    padding: "0",
    backgroundImage: `url(${
      data.photos[0]?.url ? data.photos[0]?.url : hotelbg
    })`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    position: "relative",
  };

  var currentDate = moment(new Date(), "YYYY-MM-DD");
  var startDate = moment(new Date(data?.createdAt), "YYYY-MM-DD");

  let timeframe = "";
  let diff = currentDate.diff(startDate, "years");

  if (diff > 0) {
    timeframe = diff === 1 ? diff + " year ago" : diff + " years ago";
  } else {
    let diff = currentDate.diff(startDate, "months");
    if (diff > 0) {
      timeframe = diff === 1 ? diff + " month ago" : diff + " months ago";
    } else {
      let diff = currentDate.diff(startDate, "weeks");
      if (diff > 0) {
        timeframe = diff === 1 ? diff + " week ago" : diff + " weeks ago";
      } else {
        let diff = currentDate.diff(startDate, "days");
        if (diff > 0) {
          timeframe = diff === 1 ? diff + " day ago" : diff + " days ago";
        } else {
          let diff = currentDate.diff(startDate, "hours");
          if (diff > 0) {
            timeframe = diff === 1 ? diff + " hour ago" : diff + " hours ago";
          } else {
            let diff = currentDate.diff(startDate, "minutes");
            if (diff > 0) {
              timeframe =
                diff === 1 ? diff + " minute ago" : diff + " minutes ago";
            } else {
              let diff = currentDate.diff(startDate, "seconds");
              if (diff > 0) {
                timeframe =
                  diff === 1 ? diff + " second ago" : diff + " seconds ago";
              } else {
                timeframe = "";
              }
            }
          }
        }
      }
    }
  }

  return (
    <>
      <main className="flex justify-center items-center my-16">
        <div className="w-full max-w-screen-md">
          <div style={hotelBg} className="relative">
            <div className="heroe-overlay flex justify-center items-center flex-col">
              <div className="flex justify-center gap-3 items-cente">
                <Link
                  to={`/view-hotel-listing/${data?.name}/${data?._id}`}
                  className=""
                >
                  <button className="bg-green-700 hover:bg-green-800 duration-500 w-ful py-3 px-5 uppercase text-xs text-white">
                    view hotel
                  </button>
                </Link>
                <button
                  className="bg-secondar bg-red-700 hover:bg-red-800 duration-500 w-ful py-3 px-5 uppercase text-xs text-white"
                  onClick={() => {
                    toggleEditHotelModal();
                    setEditHotelState(data);
                  }}
                >
                  edit hotel
                </button>
              </div>
              <div className="flex justify-center mt-3">
                <button
                  className="bg-primary w-full py-3 px-5 uppercase text-xs text-white"
                  onClick={() => {
                    addRoomsModal();
                    setGetHotelId(data._id);
                  }}
                >
                  add rooms
                </button>
              </div>
              <div
                className="py-4 px- absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-2xl tracking-widest font-light"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <p>{data.name} Hotel</p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <button
                className="rounded-full w-12 h-12 p-0 border-0 inline-flex items-center justify-center text-2xl text-gray-200 delete-animation"
                onClick={() => deleteHotel(data?._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <span>{timeframe}</span>
        </div>
      </main>
      {data && <HotelRoomsListings hotelId={data?._id} />}
    </>
  );
};

export default ListingsItem;
