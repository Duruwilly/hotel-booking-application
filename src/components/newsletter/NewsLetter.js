import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex bg-primary justify-center py-8">
      <div className="flex items-center justify-center flex-col w-full px-4">
        <h1 className="text-center text-white text-2xl">Sign up to our newsletter</h1>
        <p className="text-sm text-center text-white">Save money while you enjoy the best deals</p>
        <div className="mt-4">
          <input
            className="border-none mb-2 p-3 w-full"
            type="text"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="font-semibold pr-3 bg-red-900 w-full p-3 text-white"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
