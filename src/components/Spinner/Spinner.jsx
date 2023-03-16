import React from "react";

const Spinner = () => {
  return (
    <div className="bg-primaryBackground h-screen w-full flex justify-center items-center px-4">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
