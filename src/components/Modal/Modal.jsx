import React from "react";

const Modal = ({ toggle, children }) => {
  return (
    <div
      className=" w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[100] px-2"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
      //   onClick={() => toggle()}
    >
      <div className="w-full max-w-screen-xl relative shadow-md overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
