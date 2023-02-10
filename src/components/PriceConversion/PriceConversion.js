import React from "react";

const PriceConversion = () => {
  return (
    <select className="outline-none py-3 px-6 border border-gray-300 text-base">
      <option value="dollar">USD</option>
      <option value="euro">EUR</option>
      <option value="naira">Naira</option>
    </select>
  );
};

export default PriceConversion;
