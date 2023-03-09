import React from "react";

const Location = ({ singleHotel }) => {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-screen-lg space-y-3 px-4">
          <h1 className="text-cente text-2xl font-light">Location</h1>
          <p className="font-light text-sm leading-loose mt-1">
            {singleHotel?.location}
          </p>
        </div>
      </section>
    </>
  );
};

export default Location;
