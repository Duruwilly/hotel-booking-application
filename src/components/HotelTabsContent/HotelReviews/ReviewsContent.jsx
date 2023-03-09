import { format } from "date-fns";
import React from "react";

const ReviewsContent = ({ reviews }) => {
  return (
    <div className="border-t-2 border-gray-300 py-5">
      <div className="flex flex-row review-content justify-between">
        <div>
          <h2>{reviews?.title}</h2>
          <span className="text-gray-400 capitalize">
            {reviews?.name === "" ? "Anonymous" : reviews?.name} on{" "}
            {format(new Date(reviews?.createdAt), "MMM dd yyy")}
          </span>
          <p className="text-sm font-light">{reviews?.comment}</p>
        </div>
        <div>
          <span className="mr-2">
            {reviews?.rating === Number(0)
              ? "Bad"
              : reviews?.rating === Number(2)
              ? "Poor"
              : reviews?.rating === Number(4)
              ? "Fair"
              : reviews?.rating === Number(6)
              ? "Good"
              : "Excellent"}
          </span>
          <button
            className={`${
              reviews?.rating === Number(0)
                ? " bg-red-700"
                : reviews?.rating === Number(2)
                ? "bg-red-700"
                : reviews?.rating === Number(4)
                ? " bg-yellow-400"
                : reviews?.rating === Number(6)
                ? "bg-green-700"
                : "bg-green-700"
            } py-2 px-4 text-white text-xl"`}
          >
            {reviews?.rating}/10
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsContent;
