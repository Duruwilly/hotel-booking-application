import React, { useEffect, useState } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PriceConversion from "../../components/PriceConversion/PriceConversion";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";

const Basket = () => {
  const {steps, setSteps, list} = useMediaQueriesContext()
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-screen-sm py- px-4">
        <div className=" m-auto">
          <ProgressBar step={steps} list={list} />
        </div>
        <Confirmation setSteps={setSteps} /> 
      </div>
    </section>
  );
};

export default Basket;

const Confirmation = ({ setSteps }) => {
  const navigate = useNavigate()
  useEffect(() => {
    setSteps(() => 1);
  }, []);

  const buttonNavigate = () => {
    setSteps(() => 2);
    navigate('/payment')
  }

  return (
    <section className="py-12">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-center text-4xl font-light pb-5 lg:pb-0">
          Your basket
        </h1>
        <PriceConversion />
      </div>
      <div
        className="pb-1 pt-12"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span className="text-gray-400 uppercase text-xs font-light ">
          Madrid, spain
        </span>
        <h2 className="text-3xl font-light">Name of the hotel</h2>
      </div>
      <div
        className="pt-6"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <div className="flex justify-between items-center pb-6">
          <p className="font-semibold capitalize">room</p>
          <span className="font-semibold capitalize">superior</span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">dates</p>
          <span className="font-extralight capitalize">22, february 2023 - 24 february 2023(2 nights)</span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">guests</p>
          <span className="font-extralight capitalize">2 adults</span>
        </div>
        <div className="flex justify-between items-center pb-6">
          <p className="text-gray-400 capitalize">beds</p>
          <span className="flex justify-cente items-center gap-1 text-sm font-semibold">
            <MdOutlineKingBed className="text-3xl" />{" "}
            <span className="text-red-900">x 1</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-1">
          <p className="text-gray-400 capitalize">includes</p>
          <span className="font-extralight capitalize">
            this is a room only rate
          </span>
        </div>
      </div>
      <div
        className="flex justify-between items-center pt-6 pb-1"
        style={{ borderBottom: "1px solid rgba(107,114,128,.1)" }}
      >
        <span className="text-xl font-light">Total price</span>
        <p className="text-3xl font-light">$1,204</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-12 justify-between items-center pt-6">
        <button className="capitalize relative w-full py-4 font-medium rounded-sm text-white bg-red-900 focus:outline-none tracking-widest text-xs">
          remove
        </button>
        <button
          className="bg-green-700 text-white relative w-full  py-4 font-medium rounded-sm focus:outline-none uppercase tracking-widest text-xs"
          onClick={buttonNavigate}
        >
          confirm booking
        </button>
      </div>
    </section>
  );
};

const Form2 = () => {
  return <div>Form 2</div>;
};
