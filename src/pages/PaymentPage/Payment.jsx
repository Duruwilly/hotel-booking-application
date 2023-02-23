import React, { useEffect } from "react";
import { GiPadlock } from "react-icons/gi";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TimeInHours from "../../utils/TimeInHours";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDaysCalculate from "../../hooks/useDaysCalculate";
import BookingSummaryCard from "../../components/bookingSummaryCard/BookingSummaryCard";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import useRoomsAvailabilityCheck from "../../utils/useRoomsAvailabilityCheck";

const Payment = () => {
  useTitle("Book the world best hotel");
  const { steps, list, setSteps } = useMediaQueriesContext();
  useEffect(() => {
    setSteps(() => 2);
  }, []);

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-screen-xl py- px-4">
        <div className=" m-auto">
          <ProgressBar step={steps} list={list} />
        </div>
        <PaymentCard />
      </div>
    </section>
  );
};

export default Payment;

const PaymentCard = () => {
  let { roomOptions, dateSearch } = useSelector((state) => state.searchState);
  let { basketItems } = useSelector((state) => state.basket);

  let { days } = useDaysCalculate();
  let { handlePay } = useRoomsAvailabilityCheck();
  let total = 0;

  basketItems.forEach((item) => {
    total += item.quantity * item[0].price * days * roomOptions.rooms;
  });

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

  console.log(basketItems.map((hi) => hi[0].roomNumbers.map((id) => id._id)));

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
                  />
                  <input
                    type="text"
                    className={inputStyles}
                    placeholder="Last name"
                    id="lastName"
                    value={userPaymentData.lastName}
                    onChange={onChange}
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
                  className={inputStyles}
                  placeholder="Add a special request or comment to your booking"
                ></textarea>
              </div>
            </div>
            <div className="bg-white p-4 h-fit mt-4" style={{ flex: 1 }}>
              <div className="flex justify-between">
                <p>Total price</p>
                <span className="text-xl">
                  ${[total].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                    handlePay();
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
              <div key={basket[0]._id}>
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
