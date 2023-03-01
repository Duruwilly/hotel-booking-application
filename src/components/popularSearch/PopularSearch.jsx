import { format } from "date-fns";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  popularSearch1Bg,
  popularSearch2Bg,
  popularSearch3Bg,
  popularSearch4Bg,
  popularSearch5Bg,
  popularSearch6Bg,
} from "../../BgImageStyles/styles";
import { setDestination } from "../../redux/searchStateSlice";
const PopularSearch = () => {
  const navigate = useNavigate();
  let { destination, dateSearch } = useSelector((state) => state.searchState);
  const dispatch = useDispatch();
  console.log(destination);

  const navigateToLocation = async (location) => {
    dispatch(setDestination(location));

    let url = `/destinations/hotels?query=${location}&date_from=${format(
      new Date(dateSearch[0].startDate),
      "dd-MM-yyyy"
    )}&date_to=${format(new Date(dateSearch[0].endDate), "dd-MM-yyyy")}`;

    navigate(url);
  };

  return (
    <section className="flex flex-col items-center mt-16">
      <h2 className="text-3xl mb-5">Popular searches</h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 w-full max-w-screen-lg justify-center items-center px-4">
        <button
          onClick={() => {
            navigateToLocation("spain");
          }}
          style={popularSearch1Bg}
        >
          <div className="overlay">
            <h1>stylish stays in spain</h1>
          </div>
        </button>
        <button
          onClick={() => {
            navigateToLocation("france");
          }}
          style={popularSearch2Bg}
        >
          <div className="overlay">
            <h1>beaux french boltholes</h1>
          </div>
        </button>
        <button
          onClick={() => {
            navigateToLocation("greece");
          }}
          style={popularSearch3Bg}
        >
          <div className="overlay">
            <h1>get your greek on</h1>
          </div>
        </button>
        <button
          onClick={() => {
            navigateToLocation("turkey");
          }}
          style={popularSearch4Bg}
        >
          <div className="overlay">
            <h1>great turkish delight</h1>
          </div>
        </button>
        <button
          onClick={() => {
            navigateToLocation("portugal");
          }}
          style={popularSearch5Bg}
        >
          <div className="overlay">
            <h1>portuguese crash pads</h1>
          </div>
        </button>
        <button
          onClick={() => {
            navigateToLocation("germany");
          }}
          style={popularSearch6Bg}
        >
          <div className="overlay">
            <h1>the german man</h1>
          </div>
        </button>
      </div>
    </section>
  );
};

export default PopularSearch;
