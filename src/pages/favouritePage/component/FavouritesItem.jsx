import React, { useState } from "react";
import image1 from "../../../assets/images/heroe.jpg";
import { Link } from "react-router-dom";

const FavouritesItem = ({
  fav,
  exchangedPrice,
  convertPrice,
  deleteFavourite,
}) => {
  const [activeItem, setActiveItem] = useState("");

  return (
    <div className="bg-whit border border-gray-300">
      <div style={{ flex: 3 }}>
        <Link to={`/hotel/${fav.name}/${fav.destination}/${fav._id}`}>
          <div>
            <img src={fav.photos[0]?.url} alt="" />
          </div>
        </Link>
      </div>
      <div className="" style={{ flex: 2 }}>
        {fav._id !== activeItem ? (
          <>
            <div
              className=" py-3 text-center font-light"
              style={{ background: "rgba(0,0,0,0.1)" }}
            >
              Price per night from{" "}
              <span className="font-semibold">
                {`${
                  convertPrice === "USD"
                    ? "$"
                    : convertPrice === "EUR"
                    ? "£"
                    : "₦"
                } ${[Math.round(fav.price * exchangedPrice)]
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </span>
            </div>
            <h1 className="text-center py-2 text-xs font-semibold uppercase">
              {/* {fav.country + "," + " " + fav.state} */}
              {fav?.destination}
            </h1>
            <h2 className="text-center pb-4 text-2xl font-light capitalize">
              {fav.name}
            </h2>
            <p className="text-cente px-4 pb-6">
              <span className="text-red-900 font-semibold capitalize">
                Free includes
              </span>{" "}
              <span className="font-light">{fav.feature}</span>
            </p>
            <div className="flex justify-center items-cente gap-2">
              <Link
                to={`/hotel/${fav.name}/${fav.destination}/${fav._id}`}
                className="bg-primary text-xs text-white uppercase py-3 w-full text-center"
              >
                view hotel
              </Link>
              <button
                className="bg- border text-xs border-gray-900 hover:bg-primary hover:text-white uppercase py-3 w-full"
                onClick={() => {
                  fav._id === activeItem
                    ? setActiveItem("")
                    : setActiveItem(fav._id);
                }}
              >
                delete
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="pt-9 pb-[72px]">
              <h1 className="px-4 font-medium p-">Delete favourites list</h1>
              <p className="px-4 font-light pt-5">
                Are you sure you want to delete this list of favourites?
              </p>
            </div>
            <div className="flex justify-center items-cente gap-2">
              <button
                className="bg-primary text-xs text-white uppercase py-3 w-full"
                onClick={() => deleteFavourite(fav._id)}
              >
                delete
              </button>
              <button
                className="bg- border text-xs border-gray-900 hover:bg-primary hover:text-white uppercase py-3 w-full"
                onClick={() => {
                  setActiveItem("");
                }}
              >
                cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritesItem;
