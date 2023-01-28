import React from "react";

export const MobileNavBtn = ({ text }) => {
  return (
    <button
      className="w-full py-3 text-gray-300 rounded-sm"
      style={{ background: "rgba(31, 41, 55, 1)" }}
    >
      {text}
    </button>
  );
};
