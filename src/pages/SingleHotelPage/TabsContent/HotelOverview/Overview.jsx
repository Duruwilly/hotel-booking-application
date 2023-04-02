import React from "react";
import {
  overviewFacilitiesBg,
  overviewFoodsBg,
} from "../../../../BgImageStyles/styles";

const Overview = ({ singleHotel }) => {
  console.log(singleHotel);
  return (
    <>
      {singleHotel.feature && (
        <section className="flex justify-center">
          <div className="w-full max-w-screen-lg px-4">
            <p className="leading-loose font-light italic">
              {singleHotel?.overview?.overview
                ? singleHotel?.overview?.overview
                : singleHotel?.overview}
            </p>
            <div className="bg-white py-4 text-center my-5">
              <h4 className="text-red-900 font-semibold capitalize mb-3">
                free includes
              </h4>
              <span className="font-semibold">
                Get this when you book through us:
              </span>
              <p className="font-light text-sm">{singleHotel.feature}</p>
            </div>
          </div>
        </section>
      )}
      {singleHotel?.overview?.facilities
        ? singleHotel?.overview?.facilities
        : singleHotel?.facilities && (
            <section className="">
              <div style={overviewFacilitiesBg}>
                <div className="heroe-overlay">
                  <div
                    className="py-4 px- absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-2xl tracking-widest font-light"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    <p>facilities</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-screen-lg mt-3 space-y-3 px-4">
                  <h1 className="text-cente text-2xl font-light">
                    At the hotel
                  </h1>
                  <p className="font-light text-sm leading-loose mt-1">
                    {singleHotel?.overview?.facilities
                      ? singleHotel?.overview?.facilities
                      : singleHotel?.facilities}
                  </p>
                </div>
              </div>
            </section>
          )}
      {singleHotel?.overview?.foods_and_drinks
        ? singleHotel?.overview?.foods_and_drinks
        : singleHotel?.foods_and_drinks && (
            <section className="mt-10">
              <div style={overviewFoodsBg}>
                <div className="heroe-overlay">
                  <div
                    className="py-4 px- absolute bottom-0 left-0 w-full max-w-screen-md uppercase text-white text-center text-2xl tracking-widest font-light"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    <p>food and drink</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-screen-lg mt-3 space-y-3 px-4">
                  <h1 className="text-cente text-2xl font-light">
                    Hotel restaurant
                  </h1>
                  <p className="font-light text-sm leading-loose mt-1">
                    {singleHotel?.overview?.foods_and_drinks
                      ? singleHotel?.overview?.foods_and_drinks
                      : singleHotel?.foods_and_drinks}
                  </p>
                </div>
              </div>
            </section>
          )}
    </>
  );
};

export default Overview;
