import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useMediaQueriesContext } from "../../../context/MediaQueryContext";
import useFetch from "../../../hooks/useFetch";
import Modal from "../../Modal/Modal";
import Spinner from "../../Spinner/Spinner";
import ReviewsContent from "./ReviewsContent";

const Reviews = ({ hotelName, hotelID, hotelReviews, setFetchStatus }) => {
  const id = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal((state) => !state);
  };
  const inputStyles =
    "w-full focus:outline-none border border-gray-300 p-3 placeholder:text-sm block rounded-md";
  const [userReviewData, setUserReviewData] = useState({
    name: "",
    email: "",
    rating: "",
    title: "",
    comment: "",
  });

  const onChange = (e) => {
    setUserReviewData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8800/api/v1/create-reviews/${hotelID}`;
    if (user) {
      try {
        const response = await axios.post(url, { ...userReviewData });
        if (response?.data.status === "success") {
          setFetchStatus("idle");
          setUserReviewData(() => ({
            [e.target.id]: "",
          }));
          toggleModal();
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {hotelReviews && hotelReviews?.length > 0 && (
        <section className="flex justify-center">
          <div className="w-full max-w-screen-lg px-4">
            <div className=" pb-4 flex justify-between review-content mb-5">
              <h1 className="text-2xl capitalize">reviews of {hotelName}</h1>
              <span
                className="text-red-800 cursor-pointer"
                onClick={() => toggleModal()}
              >
                Write a guest review
              </span>
            </div>
            {hotelReviews?.map((reviews) => (
              <div key={reviews._id}>
                <ReviewsContent reviews={reviews} />
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="flex justify-center">
        <div className="w-full max-w-screen-lg px-4">
          {hotelReviews.length === 0 && (
            <p className="text-center">
              No reviews at the moment. Be the first to give a review by{" "}
              <span
                className="text-red-800 cursor-pointer"
                onClick={() => toggleModal()}
              >
                writing a guest review.
              </span>
            </p>
          )}
        </div>
      </section>
      {openModal && (
        <Modal toggle={() => toggleModal()}>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full max-w-screen-sm relative shadow-md">
              <FaTimes
                onClick={() => setOpenModal(false)}
                className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
              />
              {/* <button
            className="text-white absolute top-4 right-4 text-3xl cursor-pointer"
            onClick={() => toggleModal()}
          ></button> */}
              <form className="py-24 px-8" onSubmit={submitReview}>
                <div className="border-b border-gray-300 mb-4 pb-2">
                  <p className=" font-medium text-lg">
                    Your first-hand experiences really help other travelers.
                    Thanks!
                  </p>
                </div>
                <div className="space-y-3 px-">
                  <div>
                    <label>Your Name</label>
                    <input
                      type="text"
                      className={inputStyles}
                      placeholder="Name"
                      id="name"
                      value={userReviewData.name}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label>Your Email</label>
                    <input
                      type="text"
                      className={inputStyles}
                      placeholder="Email Address"
                      id="email"
                      value={userReviewData.email}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label>Rating</label>
                    <select
                      className={inputStyles}
                      id="rating"
                      value={userReviewData.rating}
                      onChange={onChange}
                    >
                      <option value="">select rating</option>
                      <option value="0">0</option>
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <div>
                    <label>Title of your review</label>
                    <input
                      type="text"
                      className={inputStyles}
                      placeholder="Summarize your stay or highlight an interesting details."
                      id="title"
                      value={userReviewData.title}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label>Your Review</label>
                    <textarea
                      name=""
                      id="comment"
                      value={userReviewData.comment}
                      onChange={onChange}
                      className={inputStyles}
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-light cursor-pointer w-full"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Reviews;
