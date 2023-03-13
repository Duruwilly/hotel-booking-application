import React from "react";

const Button = ({ text }) => {
  return (
    <button
      className="py-3 px-20 text-white hover:opacity-80 transition duration-700 ease-in-out rounded-sm"
      style={{ background: "#182428" }}
    >
      {text}
    </button>
  );
};

export default Button;
