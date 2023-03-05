import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../Modal/Modal";

const Reviews = ({ hotelName }) => {
  const [openModal, setOpenModal] = useState(false);

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

  const submitReview = (e) => {
    e.preventDefault();
    toggleModal();
    setUserReviewData(() => ({
      [e.target.id]: "",
    }));
  };
  return (
    <>
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
          <div className="border-t-2 border-gray-300 py-5">
            <div className="flex flex-row review-content justify-between">
              <div>
                <h2>serene environment</h2>
                <span className="text-gray-400">
                  Anonymous on january 28, 2014
                </span>
                <p className="text-sm font-light">
                  he hotel was okay and easily accessible. Though, they tried
                  but they need on work on the air condition.
                </p>
              </div>
              <div>
                <span className="mr-2">Good</span>
                <button className=" bg-green-700 py-2 px-4 text-white text-xl">
                  7/10
                </button>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-gray-300 py-5">
            <div className="flex flex-row review-content justify-between">
              <div>
                <h2>serene environment</h2>
                <span className="text-gray-400">
                  Anonymous on january 28, 2014
                </span>
                <p className="text-sm font-light">
                  he hotel was okay and easily accessible. Though, they tried
                  but they need on work on the air condition.
                </p>
              </div>
              <div>
                <span className="mr-2">Good</span>
                <button className=" bg-green-700 py-2 px-4 text-white text-xl">
                  7/10
                </button>
              </div>
            </div>
          </div>
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
                      <option value="0/10">0/10</option>
                      <option value="2/10">2/10</option>
                      <option value="4/10">4/10</option>
                      <option value="6/10">6/10</option>
                      <option value="8/10">8/10</option>
                      <option value="10/10">10/10</option>
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
                    <button className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-light cursor-pointer w-full">
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
