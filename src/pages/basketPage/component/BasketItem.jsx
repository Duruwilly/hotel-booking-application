import React from "react";
import { format } from "date-fns";
import { MdOutlineKingBed, MdOutlineSingleBed } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { WILL_TRIP_BASE_URL } from "../../../constants/base-urls";
import { toast } from "react-toastify";
import { useBasketContext } from "../../../context/BasketItemsContext";

const BasketItem = (props) => {
  const { user } = useAuthContext();
  const { setFetchStatus, getCartItems } = useBasketContext();
  const {
    feature,
    roomOptions,
    dateSearch,
    days,
    quantity,
    hotelCountry,
    hotelName,
    exchangedPrice,
    convertPrice,
  } = props;

  const deleteCartItems = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/cart/${user?.id}/delete-cart-item/${id}`;
    try {
      let response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.data.status === "success") {
        setFetchStatus("idle");
        getCartItems(user);
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div
        className="pb-1 pt-12"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span className="text-gray-400 uppercase text-xs font-light ">
          {hotelCountry}
        </span>
        <h2 className="text-3xl font-light">{hotelName}</h2>
      </div>
      <div
        className="pt-6"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="font-semibold capitalize">room</p>
          <span className="font-semibold capitalize">{props.title}</span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">dates</p>
          <span className="font-extralight capitalize">
            {`${format(
              new Date(dateSearch[0]?.startDate),
              "dd MMMM yyyy"
            )} - ${format(new Date(dateSearch[0]?.endDate), "dd MMMM yyyy")}`}
          </span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">guests</p>
          <span className="font-extralight capitalize">{`${
            roomOptions.adult + roomOptions.children === 1
              ? `${roomOptions.adult + roomOptions.children} guests`
              : `${roomOptions.adult + roomOptions.children} guests`
          }`}</span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">beds</p>
          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
            {props.maxPeople === 1 || props.maxPeople === 2 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 1
              </span>
            ) : props.maxPeople === 3 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 1{" "}
                <MdOutlineSingleBed className="text-3xl" /> x1{" "}
              </span>
            ) : props.maxPeople === 4 ? (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 2{" "}
              </span>
            ) : (
              <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
                <MdOutlineKingBed className="text-3xl" /> x 2{" "}
                <MdOutlineSingleBed className="text-3xl" /> x1{" "}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">includes</p>
          <span className="font-extralight capitalize">{feature}</span>
        </div>
        <div className="pb-1 flex justify-between items-center">
          <span className="text-gray-400 font-light capitalize">price</span>
          <p className="font-light text-gray-">
            {`${
              convertPrice === "USD" ? "$" : convertPrice === "EUR" ? "£" : "₦"
            } ${[props.price * days * quantity * exchangedPrice]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}{" "}
            x {quantity}
          </p>
        </div>
      </div>
      <div
        className="py-3 text-right cursor-pointer"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span
          className="text-xl font-semibol text-red-700 cursor-pointer"
          onClick={() => deleteCartItems(props._id)}
        >
          Remove
        </span>
      </div>
    </>
  );
};

export default BasketItem;
