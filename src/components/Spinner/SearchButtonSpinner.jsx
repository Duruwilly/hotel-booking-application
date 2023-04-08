import React from "react";

const SearchButtonSpinner = () => {
  return (
    <div className="bg-primaryBackground h-screen w-full flex justify-center items-center px-4">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SearchButtonSpinner;
