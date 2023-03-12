import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiThumbUpLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsStarHalf } from "react-icons/bs";
import { popularSearch2Bg } from "../../BgImageStyles/styles";

const Reviews = () => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);

  return (
    <>
      <div style={popularSearch2Bg}>
        <div className="overlay">
          <h1 className="capitalize text-2xl mb-5">
            the travel club for adventure lovers
          </h1>
          <p className="lowercase text-lg">what our members say</p>
        </div>
      </div>
      <section className="flex flex-col items-center justify-center mt-6">
        <div className="text-white flex gap-1 mb-6">
          <div className="bg-green-700 h-[20px] w-[20px] flex justify-center items-center">
            <AiFillStar className="" />
          </div>
          <div className="bg-green-700 h-[20px] w-[20px] flex justify-center items-center">
            <AiFillStar className="" />
          </div>
          <div className="bg-green-700 h-[20px] w-[20px] flex justify-center items-center">
            <AiFillStar className="" />
          </div>
          <div className="bg-green-700 h-[20px] w-[20px] flex justify-center items-center">
            <AiFillStar className="" />
          </div>
          <div className="bg-green-700 h-[20px] w-[20px] flex justify-center items-center">
            <BsStarHalf />
          </div>
        </div>
        <div className="w-full max-w-screen-lg px-4">
          <p>
            Feedback is of the utmost importance to Will Trip, and we love to
            hear from our members. That's why we enlisted indepent review
            specialists TrustPilot and universe to help us understand exactly
            how you feel, and your opinions have been both helpful and humbling.
            Here's a small selection of cooments from the couple of months...
          </p>
        </div>
        <div className="flex mt-14 border-b-2 pb-3">
          <p className="">Inpendent reviews provided by Universe</p>
        </div>
        <p className="mt-4">What our members says about Will Trip</p>
        <div className="flex flex-col md:flex-row gap-3 my-8">
          <div className="border-2 text-center p-5">
            <h2>Overall</h2>
            <span className="text-4xl font-bold text-red-900">97%</span>
            <p>
              of <strong>11893</strong> respondants would book again from Will
              Trip
            </p>
          </div>
          <div className="border-2 text-center p-5">
            <h2>Customer service</h2>
            <span className="text-4xl font-bold text-red-900">87%</span>
            <p>
              of <strong>2358</strong> respondants said enquiries handled
              effectively.
            </p>
          </div>
        </div>
        <div className="border-t-2 border-b-2 py-7">
          <p>11893 reviews in the past 12 months</p>
        </div>
        <div className="w-full max-w-screen-lg border-b-2 pb-8 px-4 mt-10">
          <div className="flex gap-6 items-center">
            <RiThumbUpLine className="text-red-700 border border-red-800 rounded-full p-2 text-5xl" />
            <p className="capitalize font-semibold">belinda</p>
          </div>
          <span>Overall</span>
          <p>satisfied</p>
          <p className="mt-2">
            Had efficient help moving the booking dates from Will Trip staff
            member, Bright
          </p>
          <div className="flex gap-8 mt-8 text-gray-500">
            <p>Confirmed stay: 21/06/2022</p>
            <p>Published on: 24/06/2022</p>
          </div>
          <div
            className="flex items-center gap-3 mt-4 text-green-700 cursor-pointer w-32"
            onClick={() => setOpen(!open)}
          >
            {open === true ? (
              <>
                <p>Hide scores</p>
                <IoIosArrowUp />
              </>
            ) : (
              <>
                <p>Show scores</p>
                <IoIosArrowDown />
              </>
            )}
          </div>
          {open && <p className="mt-3">Likelihood to recommend: 90%</p>}
        </div>
        <div className="w-full max-w-screen-lg border-b-2 pb-8 px-4 mt-5">
          <div className="flex gap-6 items-center">
            <RiThumbUpLine className="text-red-700 border border-red-800 rounded-full p-2 text-5xl" />
            <p className="capitalize font-semibold">jennifer</p>
          </div>
          <span>Overall</span>
          <p>satisfied</p>
          <p className="mt-2">Smooth registration and check in</p>
          <div className="flex gap-8 mt-8 text-gray-500">
            <p>Confirmed stay: 21/10/2022</p>
            <p>Published on: 24/10/2022</p>
          </div>
          <div
            className="flex items-center gap-3 mt-4 text-green-700 cursor-pointer w-32"
            onClick={() => setSecondOpen(!secondOpen)}
          >
            {secondOpen === true ? (
              <>
                <p>Hide scores</p>
                <IoIosArrowUp />
              </>
            ) : (
              <>
                <p>Show scores</p>
                <IoIosArrowDown />
              </>
            )}
          </div>
          {secondOpen && <p className="mt-3">Likelihood to recommend: 100%</p>}
        </div>
        <div className="w-full max-w-screen-lg border-b-2 pb-8 px-4 mt-4">
          <div className="flex gap-6 items-center">
            <RiThumbUpLine className="text-red-700 border border-red-800 rounded-full p-2 text-5xl" />
            <p className="capitalize font-semibold">tonia</p>
          </div>
          <span>Overall</span>
          <p>satisfied</p>
          <p className="mt-2">
            Will Trip team always on hand to help with any amends to bookings
            and always so friendly
          </p>
          <div className="flex gap-8 mt-8 text-gray-500">
            <p>Confirmed stay: 21/08/2022</p>
            <p>Published on: 24/08/2022</p>
          </div>
          <div
            className="flex items-center gap-3 mt-4 text-green-700 cursor-pointer w-32"
            onClick={() => setThirdOpen(!thirdOpen)}
          >
            {thirdOpen === true ? (
              <>
                <p>Hide scores</p>
                <IoIosArrowUp />
              </>
            ) : (
              <>
                <p>Show scores</p>
                <IoIosArrowDown />
              </>
            )}
          </div>
          {thirdOpen && <p className="mt-3">Likelihood to recommend: 100%</p>}
        </div>
        <Link
          to="/reviews"
          className="bg-primary py-3 px-7 capitalize text-white mt-8 mb-4"
        >
          read more reviews
        </Link>
      </section>
    </>
  );
};

export default Reviews;
