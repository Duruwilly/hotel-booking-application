import React from "react";
import { Link } from "react-router-dom";
import { popularSearch1Bg, popularSearch2Bg, popularSearch3Bg, popularSearch4Bg, popularSearch5Bg, popularSearch6Bg } from "../../BgImageStyles/styles";

const PopularSearch = () => {
  return (
    <section className="flex flex-col items-center mt-20">
      <h2 className="text-3xl mb-5">Popular searches</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 w-full max-w-screen-lg justify-center items-center px-4">
        <Link to="/popular-hotels" style={popularSearch1Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
        <Link to="/popular-hotels" style={popularSearch2Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
        <Link to="/popular-hotels" style={popularSearch3Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
        <Link to="/popular-hotels" style={popularSearch4Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
        <Link to="/popular-hotels" style={popularSearch5Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
        <Link to="/popular-hotels" style={popularSearch6Bg}>
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default PopularSearch;
