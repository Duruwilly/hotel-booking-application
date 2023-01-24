import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex bg-primary justify-center h-40 text-white">
      <div className="flex items-center justify-center flex-col w-full">
        <h1 className="text- mb-2">Save time, Save money</h1>
        <p className="text-sm">Sign up and we'll send the best deals to you</p>
        <div className="flex border mt-5">
          <input
            type="text"
            placeholder="Enter your Email"
            className="h-8 w-72 p-3 border-none mr-2"
          />
          <button type="submit" className="pr-3 font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
