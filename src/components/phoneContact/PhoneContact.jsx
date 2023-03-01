import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";

const PhoneContact = () => {
  return (
    <div
      className="flex justify-center text-white h-16"
      style={{ background: "rgba(31, 41, 55, 1)" }}
    >
      <div className="flex items-center justify-center w-full max-w-screen-lg px-3">
        <div className="flex items-center gap-2">
          <BsFillTelephoneFill />
          <p className="text-sm font-semibold text-center">
            Call a Will Trip travel specialist on{" "}
            <a href="tel:+2349000000000" className="border-b border-white">
              +234 900 0000 000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneContact;
