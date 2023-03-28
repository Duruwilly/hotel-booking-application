import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../../../components/Spinner/Spinner";
import { WILL_TRIP_BASE_URL } from "../../../../../constants/base-urls";
import image1 from "../../../../../assets/images/heroe.jpg";
import image2 from "../../../../../assets/images/heroe2.jpg";

const ViewRoomsListing = () => {
  const locationID = useLocation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [singleRoom, setSingleRoom] = useState();
  const id = locationID.pathname.split("/")[3];
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchRoomListing = async () => {
      const url = `${WILL_TRIP_BASE_URL}/rooms/${id}`;
      try {
        const res = await axios.get(url);
        if (res.data.status) {
          setLoading(false);
          setSingleRoom(res.data.data);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRoomListing();
    return () => {
      controller.abort();
    };
  }, [id]);

  const dummyImg = [
    {
      src: image1,
    },
    {
      src: image2,
    },
  ];

  if (loading) return <Spinner />;
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-screen-lg px-4 py-6">
        <main>
          {/* {imgSrc === "" ? (
            <img
              src={singleHotel.photos[0]}
              alt={singleHotel.name}
              className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
            />
          ) : (
            <img
              src={imgSrc}
              alt={singleHotel.name}
              className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
            />
          )}
          <div className="container grid gap-1 ml-auto grid-cols-5 mx-auto mt-2 justify-center items-center">
            {singleHotel.photos.map((img, index) => (
              <span key={index} className="rounded mx-auto">
                <img
                  src={img}
                  alt={singleHotel.name}
                  className={
                    imgSrc === img
                      ? "h-16 w-16 object-contain object-center rounded border border-red-900 bg-purple-100 p-1 cursor-pointer"
                      : "h-16 w-16 object-contain object-center cursor-pointer"
                  }
                  onClick={() => {
                    setImgSrc(img);
                  }}
                />
              </span>
            ))}
          </div> */}

          {imgSrc === "" ? (
            <img
              src={dummyImg[0].src}
              alt=""
              className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
            />
          ) : (
            <img
              src={imgSrc}
              alt=""
              className="lg:w-full w-full lg:h-80 h-auto object-contain object-center rounded"
            />
          )}
          <div className="flex justify-center gap-6 mt-2">
            {dummyImg.map((img, index) => (
              <span key={index} className="rounded mx-aut">
                <img
                  src={img.src}
                  alt=""
                  className={
                    imgSrc === img.src
                      ? "h-16 w-16 object-contain object-center rounded border cursor-pointer"
                      : "h-16 w-16 object-contain object-center cursor-pointer"
                  }
                  onClick={() => {
                    setImgSrc(img.src);
                  }}
                />
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
              <div className="mt-2 space-y-4">
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">Title</p>
                  <p className="text-base font-light capitalize">
                    {singleRoom?.title}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">Price</p>
                  <p className="text-base font-light capitalize">
                    {singleRoom?.price}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">Maximum People</p>
                  <p className="text-base font-light capitalize">
                    {singleRoom?.maxPeople}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold capitalize">Room Number</p>
                  <p className="text-base font-light capitalize">
                    {singleRoom?.roomNumbers[0].number}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow w-full py-9 text-center mt-3 px-3">
                <p className="font-bold">Description</p>
                <p>{singleRoom?.description}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ViewRoomsListing;
