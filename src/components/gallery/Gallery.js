import React, { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import gallery1 from "../../assets/images/gallery1.jpeg";
import gallery2 from "../../assets/images/gallery2.jpeg";
import gallery3 from "../../assets/images/gallery3.jpeg";
import gallery4 from "../../assets/images/gallery4.jpeg";
import gallery5 from "../../assets/images/gallery5.jpeg";
import gallery6 from "../../assets/images/gallery6.jpeg";
import gallery7 from "../../assets/images/gallery7.jpeg";
import gallery8 from "../../assets/images/gallery8.jpeg";

const Gallery = () => {
  const galleryPhotos = [
    {
      id: 1,
      src: gallery1,
    },
    {
      id: 2,
      src: gallery2,
    },
    {
      id: 3,
      src: gallery3,
    },
    {
      id: 4,
      src: gallery7,
    },
    {
      id: 5,
      src: gallery6,
    },
    {
      id: 6,
      src: gallery4,
    },
    {
      id: 7,
      src: gallery5,
    },
    {
      id: 8,
      src: gallery8,
    },
  ];

  const [sliderNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (index) => {
    setSliderNumber(index);
    setOpen(true);
  };

  const handleMove = (dir) => {
    let newSliderNumber;

    if (dir === "l") {
      newSliderNumber = sliderNumber === 0 ? 7 : sliderNumber - 1;
    } else {
      newSliderNumber = sliderNumber === 7 ? 0 : sliderNumber + 1;
    }

    setSliderNumber(newSliderNumber);
  };

  return (
    <section className="flex flex-col items-center mt-16">
      <h1 className="text-4xl mb-4">Our gallery</h1>
      {open && (
        <div className="slider">
          <div
            className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute top-5 right-5 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <AiOutlineClose />
          </div>
          <div
            className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute left-5 cursor-pointer"
            onClick={() => handleMove("l")}
          >
            <AiOutlineArrowLeft className="" />
          </div>
          <div
            className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute right-5 cursor-pointer"
            onClick={() => handleMove("r")}
          >
            <AiOutlineArrowRight />
          </div>
          <div className="sliderWrapper">
            <img
              src={galleryPhotos[sliderNumber].src}
              alt=""
              className="sliderImg"
            />
          </div>
        </div>
      )}
      {open !== true && (
        <div className="flex justify-center items-center w-full max-w-screen-lg">
          <div className="trip">
            {galleryPhotos.map((photo, index) => (
              <div key={index}>
                <img
                  onClick={() => handleOpen(index)}
                  src={photo.src}
                  alt="gallery"
                  className="hover:scale-105 duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
