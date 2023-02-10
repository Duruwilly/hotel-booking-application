import React from "react";

export const RegisterSignupBtn = ({ text, disabled }) => {
  return (
    <button
      type="submit"
      className="group relative w-full flex justify-center py-3 px-4 font-medium rounded-sm text-white bg-red-900 focus:outline-none"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
