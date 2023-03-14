import React from "react";

const Button = ({ text, disabled }) => {
  return (
    <button
    type="submit"
      className="py-3 px-20 text-white hover:opacity-80 transition duration-700 ease-in-out rounded-sm"
      style={{ background: "#182428" }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
