import React, { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { VscClose } from "react-icons/vsc";
import Modal from "../../Modal/Modal";
import image1 from "../../../assets/images/heroe.jpg";
import image2 from "../../../assets/images/heroe2.jpg";

const Photos = ({ openPhotosModal, toggleModal }) => {
  const sliderImg = [
    {
      src: image1,
    },
    {
      src: image2,
    },
  ];

  const [sliderNumber, setSliderNumber] = useState(0);

  const handleMove = (dir) => {
    let newSliderNumber;

    if (dir === "l") {
      // newSliderNumber would return the last image in the array if sliderNumber is 0 else we'll keep sliding left
      newSliderNumber =
        sliderNumber === 0 ? sliderImg.length - 1 : sliderNumber - 1;
    } else {
      // if sliderNumber is equal to 1, show the first image else keep sliding right
      newSliderNumber =
        sliderNumber === sliderImg.length - 1 ? 0 : sliderNumber + 1;
    }

    setSliderNumber(newSliderNumber);
  };
  return (
    <>
      {openPhotosModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full max-w-screen-sm relative shadow-md">
              <div>
                <img src={sliderImg[sliderNumber].src} alt="" />
              </div>

              <button className="text-4xl absolute left-0 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
                <SlArrowLeft className="" onClick={() => handleMove("l")} />
              </button>

              <button className="text-4xl absolute  -right-0 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
                <SlArrowRight onClick={() => handleMove("r")} />
              </button>

              <div className="absolute top-0 right-0">
                <button
                  className={`rounded-full w-12 h-12 p-0 border-0 inline-flex items-center justify-center text-4xl text-white opacity-70 hover:text-white hover:opacity-100`}
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <VscClose className="" onClick={() => toggleModal()} />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Photos;
