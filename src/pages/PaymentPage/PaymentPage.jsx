import React, { useEffect } from "react";
import { GiPadlock } from "react-icons/gi";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TimeInHours from "../../utils/TimeInHours";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useState } from "react";
import BookingSummaryCard from "./component/BookingSummaryCard";
import { useTitle } from "../../hooks/useTitle";
import usePriceConversion from "../../utils/usePriceConversion";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useBasketContext } from "../../context/BasketItemsContext";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import SearchButtonSpinner from "../../components/Spinner/SearchButtonSpinner";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";

const Payment = () => {
  useTitle("Book the world best hotel");
  const { steps, list, setSteps, convertPrice, fetchHotelStatus } =
    useMediaQueriesContext();

  const { basketItems, datesCheck, total, setDatesCheck } = useBasketContext();

  const [exchangedPrice, setExchangedPrice] = useState(1);
  const [loadingState, setLoadingState] = useState(true);

  const { convertPrices } = usePriceConversion();

  let { checkRoomsAvailability } = useRoomsAvailabilityCheck();

  useEffect(() => {
    setSteps(() => 2);
  }, []);

  useEffect(() => {
    convertPrices().then((data) => {
      setExchangedPrice(data);
    });
  }, [convertPrice, fetchHotelStatus]);

  useEffect(() => {
    if (basketItems?.length > 0) {
      let roomId = basketItems.map((item) => item.itemId);

      const apiCallsFunc = async () => {
        try {
          const newVal = await roomId.map(async (item) => {
            const room = await checkRoomsAvailability(item);

            return room;
          });

          Promise.allSettled(newVal).then(async (data) => {
            await setDatesCheck(() => [...data?.map((item) => item?.value)]);
            if (datesCheck?.length === basketItems?.length) {
              setLoadingState(false);
            }
          });
        } catch (error) {
          console.log({ error });
        }
      };
      apiCallsFunc();
    } else {
      setLoadingState(false);
    }
  }, [basketItems]);

  if (loadingState) return <SearchButtonSpinner />;

  return (
    <section className="flex justify-center flex-1">
      <div className="w-full max-w-screen-xl py- px-4">
        <div className="m-auto">
          <ProgressBar step={steps} list={list} />
        </div>
        <PriceConversion />
        <PaymentCard
          convertPrice={convertPrice}
          exchangedPrice={exchangedPrice}
          basketItems={basketItems}
          total={total}
          datesCheck={datesCheck}
        />
      </div>
    </section>
  );
};

export default Payment;

const PaymentCard = ({
  convertPrice,
  exchangedPrice,
  basketItems,
  total,
  datesCheck,
}) => {
  const { user } = useAuthContext();

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
    hotelAddress: item?.hotelAddress,
    feature: item?.feature,
    hotelName: item?.hotelName,
    hotelLocation: item?.hotelCountry,
    roomTitle: item?.title,
    roomPrice: (item?.price * exchangedPrice).toFixed(2),
    roomNumber: item?.roomNumbers[0]?.number,
    bookingStartDate: item?.dateSearch[0]?.startDate,
    bookingEndDate: item?.dateSearch[0]?.endDate,
    adult: item?.roomOptions?.adult,
    children: item?.roomOptions?.children,
    days: item?.days,
    roomMaxGuest: item?.maxPeople,
    hotelID: item?.hotelID,
    roomID: item?.itemId,
  }));

  const paymentTransaction = async (e) => {
    // e.preventDefault();
    const url = `${WILL_TRIP_BASE_URL}/transactions/pay`;

    try {
      const response = await axios.post(url, {
        ...userPaymentData,
        bookedRoomsOption: bookedRooms,
        convertedPrice: convertPrice,
        reference_id: request_id,
        userID: user?.id,
        total: (total * exchangedPrice).toFixed(2),
      });
      // window.open(response.data.response.data.link, "_blank");
      window.location.href = response.data.response.data.link;
      if (response?.data?.response.status === "success") {
        setUserPaymentData((state) => {
          return {
            ...state,
            firstName: "",
            lastName: "",
            arrivalTime: "",
            comment: "",
            email: "",
            mobileNumber: "",
          };
        });
        // window.location.href = response.data.paymentResponseData.data.link;
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="py-12">
      {datesCheck.length > 0 && (
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
                    className="form-input"
                    placeholder="First name"
                    id="firstName"
                    value={userPaymentData.firstName}
                    onChange={onChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
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
                    className="form-input"
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
                  className="form-input"
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
                  id="comment"
                  onChange={onChange}
                  value={userPaymentData.comment}
                  className="form-input"
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
                  } ${[(total * exchangedPrice).toFixed(2)]
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
                    paymentTransaction();
                  }}
                  disabled={
                    userPaymentData.firstName === "" ||
                    userPaymentData.lastName === "" ||
                    userPaymentData.email === "" ||
                    userPaymentData.mobileNumber === "" ||
                    userPaymentData.arrivalTime === "" ||
                    datesCheck?.some((item) => item?.isBooked)
                  }
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
            {datesCheck.map((basket) => (
              <div key={basket._id}>
                <BookingSummaryCard {...basket} />
              </div>
            ))}
          </div>
        </section>
      )}
      {datesCheck.length === 0 && (
        <div className="flex justify-center flex-col items-center">
          <h1 className="font-light text-2xl text-gray-90">
            You have nothing to pay for.
          </h1>
        </div>
      )}
    </div>
  );
};
