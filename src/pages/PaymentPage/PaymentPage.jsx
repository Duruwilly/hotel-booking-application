import React, { useEffect } from "react";
import { GiPadlock } from "react-icons/gi";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TimeInHours from "../../utils/TimeInHours";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import BookingSummaryCard from "./component/BookingSummaryCard";
import { useTitle } from "../../hooks/useTitle";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";
import usePriceConversion from "../../utils/usePriceConversion";
import { useNavigate } from "react-router-dom";
import { clearBasket } from "../../redux/basketSlice";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useBasketContext } from "../../context/BasketItemsContext";
import { toast } from "react-toastify";

const Payment = () => {
  useTitle("Book the world best hotel");
  const { steps, list, setSteps, convertPrice, fetchHotelStatus } =
    useMediaQueriesContext();
  const [exchangedPrice, setExchangedPrice] = useState(1);
  const { convertPrices } = usePriceConversion();
  useEffect(() => {
    setSteps(() => 2);
  }, []);

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-screen-xl py- px-4">
        <div className="m-auto">
          <ProgressBar step={steps} list={list} />
        </div>
        <PaymentCard
          convertPrice={convertPrice}
          exchangedPrice={exchangedPrice}
        />
      </div>
    </section>
  );
};

export default Payment;

const PaymentCard = ({ convertPrice, exchangedPrice }) => {
  // let { basketItems } = useSelector((state) => state.basket);
  const { basketItems, total, getCartItems, setFetchStatus } =
    useBasketContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { days } = useDaysCalculate();
  const { user } = useAuthContext();
  let { putBookedRoomsDate } = useRoomsAvailabilityCheck();

  var request_id = new Date();
  let day = String(request_id.getDate()).padStart(2, "0");
  var month = String(request_id.getMonth() + 1).padStart(2, "0");
  let year = String(request_id.getFullYear());
  let hour = String(request_id.getHours()).padStart(2, "0");
  let minute = String(request_id.getMinutes());

  let randomStr = "";
  let random = Math.random();
  let randomNumber = (randomStr += random).split(".")[1];

  request_id = year + month + day + hour + minute + randomNumber;

  const [error, setError] = useState(false);
  const [userPaymentData, setUserPaymentData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    arrivalTime: "",
    comment: "",
  });

  const onChange = (e) => {
    setUserPaymentData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  let bookedRooms = basketItems.map((item) => ({
    hotelName: item?.hotelName,
    hotelLocation: item?.hotelCountry,
    roomTitle: item?.title,
    roomPrice: item?.price,
    roomNumber: item?.roomNumbers[0]?.number,
    bookingStartDate: item?.dateSearch[0]?.startDate,
    bookingEndDate: item?.dateSearch[0]?.endDate,
    adult: item?.roomOptions?.adult,
    children: item?.roomOptions?.children,
    days: item?.days,
    convertedPrice: convertPrice,
    transaction_id: request_id,
    userID: item?.userID,
  }));

  const clearAllCartItems = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/cart/delete-all-item/${user?.id}`;
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

  const paymentTransaction = async (e) => {
    e.preventDefault();
    const url = `${WILL_TRIP_BASE_URL}/transactions/pay`;
    if (user) {
      try {
        const response = await axios.post(url, {
          ...userPaymentData,
          bookedRoomsOption: bookedRooms,
        });
        if (response?.data.status === "success") {
          setUserPaymentData(() => ({
            [e.target.id]: "",
          }));
          // add the endpoint to clear the basket here
          // dispatch(clearBasket());
          clearAllCartItems()
          navigate("/transactions/:id");
        }
      } catch (error) {
        setError(error);
      }
      return;
    } else {
      navigate("/login");
    }
  };

  const inputStyles =
    "w-full focus:outline-none border border-gray-300 p-3 placeholder:text-sm block";
  return (
    <div className="py-12">
      {basketItems.length > 0 ? (
        <section className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-14">
          <form>
            <div
              className="bg-white border border-gray-300 p-4 h-fit"
              style={{ flex: 1 }}
            >
              <h1 className="capitalize text-2xl">your details</h1>
              <div className="pt-7 space-y-6">
                <div className="flex gap-5">
                  <input
                    type="text"
                    className={inputStyles}
                    placeholder="First name"
                    id="firstName"
                    value={userPaymentData.firstName}
                    onChange={onChange}
                    required
                  />
                  <input
                    type="text"
                    className={inputStyles}
                    placeholder="Last name"
                    id="lastName"
                    value={userPaymentData.lastName}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="flex gap-5">
                  <input
                    type="text"
                    className={inputStyles}
                    placeholder="Phone number"
                    id="mobileNumber"
                    value={userPaymentData.mobileNumber}
                    onChange={onChange}
                    required
                  />
                  <span className="text-sm text-gray-400 font-light w-full">
                    We may need to contact you about your booking
                  </span>
                </div>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="Email address"
                  id="email"
                  value={userPaymentData.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div
              className="bg-white border border-gray-300 p-4 h-fit mt-4"
              style={{ flex: 1 }}
            >
              <h1 className="capitalize text-2xl">about your stay</h1>
              <div className="pt-7 space-y-6">
                <div className="flex gap-5">
                  <p className="font-light">Approximate time of arrival?</p>
                  <select
                    name=""
                    required
                    onChange={onChange}
                    id="arrivalTime"
                    className="outline-none py-3 px-4 border border-gray-300 text-base"
                  >
                    {TimeInHours.map((time, index) => (
                      <option value={time.value} key={index}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  name=""
                  required
                  id="comment"
                  onChange={onChange}
                  value={userPaymentData.comment}
                  className={inputStyles}
                  placeholder="Add a special request or comment to your booking"
                ></textarea>
              </div>
            </div>
            <div className="bg-white p-4 h-fit mt-4" style={{ flex: 1 }}>
              <div className="flex justify-between">
                <p>Total price</p>
                <span className="text-xl">
                  {`${
                    convertPrice === "USD"
                      ? "$"
                      : convertPrice === "EUR"
                      ? "£"
                      : "₦"
                  } ${[total * exchangedPrice]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </div>
            </div>
            <div className="p- h-fit mt-4" style={{ flex: 1 }}>
              <div className="flex justify-between">
                {/* <p className="text-sm font-light">
                By completing this booking I understand and agree to the terms
                of use and the cancellation and deposit policies, including the
                requirement of adequate travel insurance.
              </p> */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    putBookedRoomsDate();
                  }}
                  className="bg-green-700 text-white relative w-full  py-4 font-medium rounded-sm focus:outline-none uppercase tracking-widest text-xs flex justify-center items-center gap-3"
                >
                  <GiPadlock />
                  pay now
                </button>
              </div>
            </div>
          </form>

          <div style={{ flex: 1 }} className="">
            <h1 className="bg-primary text-center py-5 text-white capitalize text-2xl">
              booking summary
            </h1>
            {basketItems.map((basket) => (
              <div key={basket._id}>
                <BookingSummaryCard {...basket} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <h1 className="font-light text-2xl text-gray-90">
            You have nothing to pay for.
          </h1>
        </div>
      )}
    </div>
  );
};
