import React, { useEffect } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { GiPadlock } from "react-icons/gi"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TimeInHours from "../../components/TimeinHours/TimeInHours";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";

const Payment = () => {
  const { steps, list, setSteps } = useMediaQueriesContext();
  useEffect(() => {
    setSteps(() => 2);
  }, []);

  return (
    <section className="flex justify-center">
      <div className="w-full max-w-screen-xl py- px-4">
        <div className="w- m-auto">
          <ProgressBar step={steps} list={list} />
        </div>
        {/* <Confirmation setSteps={setSteps} />  */}
        <PaymentCard />
      </div>
    </section>
  );
};

export default Payment;

const PaymentCard = () => {
  const inputStyles =
    "w-full focus:outline-none border border-gray-300 p-3 placeholder:text-sm block";
  return (
    <div className="py-12">
      <section className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-14">
        <div>
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
                />
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="Last name"
                />
              </div>
              <div className="flex gap-5">
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="Phone number"
                />
                <span className="text-sm text-gray-400 font-light w-full">
                  We may need to contact you about your booking
                </span>
              </div>
              <input
                type="text"
                className={inputStyles}
                placeholder="Email address"
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
                  id=""
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
                id=""
                className={inputStyles}
                placeholder="Add a special request or comment to your booking"
              ></textarea>
            </div>
          </div>
          <div className="bg-white p-4 h-fit mt-4" style={{ flex: 1 }}>
            <div className="flex justify-between">
              <p>Total price</p>
              <span className="text-xl">$1,434</span>
            </div>
          </div>
          <div className="p- h-fit mt-4" style={{ flex: 1 }}>
            <div className="flex justify-between">
              {/* <p className="text-sm font-light">
                By completing this booking I understand and agree to the terms
                of use and the cancellation and deposit policies, including the
                requirement of adequate travel insurance.
              </p> */}
              <button className="bg-green-700 text-white relative w-full  py-4 font-medium rounded-sm focus:outline-none uppercase tracking-widest text-xs flex justify-center items-center gap-3">
                <GiPadlock />
                pay now
              </button>
            </div>
          </div>
        </div>

        <div
          style={{ flex: 1 }}
          className="bg-white border border-gray-300 h-fit"
        >
          <h1 className="bg-primary text-center py-5 text-white capitalize text-2xl">
            booking summary
          </h1>
          <div className="p-4">
            <h2 className="text-3xl font-light">Name of the hotel</h2>
            <p className="capitalize pt-2 font-extralight">
              madrid, spain
            </p>
            <div className="pt-6">
              <div className="flex pb-2">
                <p className="font-normal text-base capitalize" style={{ flex: 1 }}>room</p>
                <span className="capitalize font-light text-sm" style={{ flex: 4 }}>superior</span>
              </div>
              <div className="flex pb-2">
                <p className="font-normal text-base capitalize" style={{ flex: 1}}>dates</p>
                <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
                  22, february 2023 - 24 february 2023(2 nights)
                </span>
              </div>
              <div className="flex  pb-2">
                <p className="font-normal text-base capitalize" style={{ flex: 1 }}>guests</p>
                <span className="capitalize font-light text-sm" style={{ flex: 4 }}>2 adults</span>
              </div>
              <div className="flex pb-2" >
                <p className="font-normal capitalize" style={{ flex: 1 }}>beds</p>
                <span className="flex justify-cente items-center gap-1 text-sm font-semibold" style={{ flex: 4 }}>
                  <MdOutlineKingBed className="text-3xl" />{" "}
                  <span className="text-red-900">x1</span>
                </span>
              </div>
              <div className="flex  pb-2">
                <p className="font-normal text-base capitalize" style={{ flex: 1 }}>includes</p>
                <span className="capitalize font-light text-sm" style={{ flex: 4 }}>
                  this is a room only rate
                </span>
              </div>
              <div className="border-y border-gray-300 py-7 text-center text-sm">
                <p className="text-red-800 capitalize font-semibold">
                  free includes
                </p>
                <span>A bottle of wine on arrival.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
