import React from "react";
import { Link } from "react-router-dom";
import { adsStyle } from "../../BgImageStyles/styles";

const Ads = () => {
  return (
    <section className="flex flex-col mt-16 items-center">
      <h1 className="text-4xl mb-5">Featured offers</h1>
      <div className="grid grid-cols-1 w-full max-w-screen-lg justify-center items-center px-4">
        <Link to="/orlando-universal" style={adsStyle}>
          <div className="p-4">
            <h1 className="text-black bg-white w-12 text-center font-bold rounded-full">
              Ad
            </h1>
          </div>
          <div className="px-4 pt-20">
            <h1 className="font-bold text-white text-xl">
              Family fun in Orlando.
            </h1>
            <p className="font-semibold">
              Save up to 30% on select Orlando hotels. Terms apply
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Ads;
