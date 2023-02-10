import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import "./ProgressBar.scss"

const ProgressBar = ({ step, list }) => {
  const location = useLocation();
  return (
    // <div className="pt-4 flex justify-center">
    //   <div className="">
    //     <div className="h-8 w-8 flex items-center justify-center rounded-full border border-green-700 text-green-700 left-0 right-0 top-0 bottom-0 mr-1">
    //       <BsCheck2 />
    //     </div>
    //     {/* <span className="font-normal text-green-700 text-sm">Choose</span> */}
    //   </div>
    //   <div className="lines">
    //     {location.pathname === "/basket" ? (
    //       <>
    //         <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-700 text-white left-0 right-0 top-0 bottom-0 m-auto text-xs cursor-default">
    //           2
    //         </div>
    //         {/* <span className="font-normal text-green-700 text-sm">Confirm</span> */}
    //       </>
    //     ) : (
    //       <>
    //         <div className="h-8 w-8 flex items-center justify-center rounded-full border border-green-700 text-green-700 left-0 right-0 top-0 bottom-0 m-auto">
    //           <BsCheck2 />
    //         </div>
    //         {/* <span className="font-normal text-green-700 text-sm">Choose</span> */}
    //       </>
    //     )}
    //   </div>
    //   {location.pathname !== "/basket" ? (
    //     <div className="">
    //       <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-700 text-white left-0 right-0 top-0 bottom-0 ml- text-xs cursor-default">
    //         3
    //       </div>
    //       {/* <span className="font-normal text-green-700 text-sm">Pay</span> */}
    //     </div>
    //   ) : (
    //     <div className="">
    //       <div className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 left-0 right-0 top-0 bottom-0 ml-1">
    //         <BsCheck2 />
    //       </div>
    //       <span className=" text-gray-400 font-semibold text-sm">
    //         Pay
    //       </span>
    //     </div>
    //   )}
    // </div>

    <div className="pt-4 step-wizard">
      <ul className="step-wizard-list">
        {list &&
          list.map((item, index) => {
            return (
              <li
                key={index}
                className={`step-wizard-item ${
                  index === step ? "current-item" : ""
                }`}
              >
                <span className="progress-count cursor-default">{index < step ? <BsCheck2 className="text-xl" /> : index + 1}</span>
                <span className="progress-label">{item}</span>
              </li>
            );
          })}
      </ul>
    </div>

  );
};

export default ProgressBar;
