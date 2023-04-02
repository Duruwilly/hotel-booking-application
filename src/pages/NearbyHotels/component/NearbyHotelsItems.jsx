import React from "react";
import { Link } from "react-router-dom";
import examImg from "../../../assets/images/popularSearch2.jpg";

const NearbyHotelsItems = ({ data, exchangedPrice, convertPrice }) => {
  return (
    <section>
      <div className="w-full max-w-2xl bg-white">
        <Link
          to={`/hotel/${data?.name}/${data?.destination}/${data?._id}`}
          className=""
        >
          <img src={data.photos[0]?.url} alt="" />
        </Link>
        <div class="services-one__single-conten relative block px-4 py-4 space-y-2">
          <p className="text-gray-400 uppercase text-xs font-light tracking-wider">
            {data.destination}
          </p>
          <p className="font-light text-lg capitalize">{data?.name}</p>
          <p className="flex justify-between">
            <span className="text-[#575757] text-sm">Price from</span>
            <span className="text-[#19242f] text-xl">{`${
              convertPrice === "USD" ? "$" : convertPrice === "EUR" ? "£" : "₦"
            } ${[data?.price * exchangedPrice]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</span>
          </p>
          <Link to={`/hotel/${data?.name}/${data?.destination}/${data?._id}`}>
            <button className="bg-green-700 hover:bg-opacity-90 text-white relative w-full  py-4 font-medium rounded-md focus:outline-none uppercase tracking-widest text-xs mt-4">
              view hotel
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NearbyHotelsItems;
