import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { VscClose } from "react-icons/vsc";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from "react-icons/ai";
import gallery1 from "../../../../assets/images/gallery1.jpeg";
import gallery2 from "../../../../assets/images/gallery2.jpeg";
import gallery3 from "../../../../assets/images/gallery3.jpeg";
import gallery4 from "../../../../assets/images/gallery4.jpeg";
import gallery5 from "../../../../assets/images/gallery5.jpeg";
import gallery6 from "../../../../assets/images/gallery6.jpeg";
import gallery7 from "../../../../assets/images/gallery7.jpeg";
import gallery8 from "../../../../assets/images/gallery8.jpeg";

const Gallery = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    smartSpeed: 500,
    // autoHeight: false,
    autoplay: true,
    dots: false,
    autoplayTimeout: 8000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      750: {
        items: 2,
      },
      1100: {
        items: 3,
      },
    },
  };

  const galleryPhotos = [
    // {
    //   id: 1,
    //   src: gallery1,
    // },
    // {
    //   id: 2,
    //   src: gallery2,
    // },
    // {
    //   id: 3,
    //   src: gallery3,
    // },
    // {
    //   id: 4,
    //   src: gallery7,
    // },
    {
      id: 5,
      src: gallery6,
    },
    // {
    //   id: 6,
    //   src: gallery4,
    // },
    {
      id: 7,
      src: gallery5,
    },
    {
      id: 5,
      src: gallery6,
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
      newSliderNumber = sliderNumber === 0 ? 3 : sliderNumber - 1;
    } else {
      newSliderNumber = sliderNumber === 3 ? 0 : sliderNumber + 1;
    }

    setSliderNumber(newSliderNumber);
  };

  return (
    // <section className="flex flex-col items-center mt-16">
    //   <h1 className="text-4xl mb-4">Our gallery</h1>
    //   {open && (
    //     <div className="slider">
    //       <div
    //         className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute top-5 right-5 cursor-pointer"
    //         onClick={() => setOpen(false)}
    //       >
    //         <AiOutlineClose />
    //       </div>
    //       <div
    //         className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute left-5 cursor-pointer"
    //         onClick={() => handleMove("l")}
    //       >
    //         <AiOutlineArrowLeft className="" />
    //       </div>
    //       <div
    //         className="h-10 w-10 flex items-center justify-center rounded-full bg-red-900 text-white absolute right-5 cursor-pointer"
    //         onClick={() => handleMove("r")}
    //       >
    //         <AiOutlineArrowRight />
    //       </div>
    //       <div className="sliderWrapper">
    //         <img
    //           src={galleryPhotos[sliderNumber].src}
    //           alt=""
    //           className="sliderImg"
    //         />
    //       </div>
    //     </div>
    //   )}
    //   {open !== true && (
    //     <div className="flex justify-center items-center w-full max-w-screen-lg">
    //       <div className="trip">
    //         {galleryPhotos.map((photo, index) => (
    //           <div key={index}>
    //             <img
    //               onClick={() => handleOpen(index)}
    //               src={photo.src}
    //               alt="gallery"
    //               className="hover:scale-105 duration-500"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </section>
    <section className="flex flex-col items-center mt-16 py-16">
      <h3 className="capitalize text-3xl mb-4 font-[500]">
        our gallery
      </h3>
      {open && (
        <div
          className=" w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[100] px-2"
          style={{ background: "rgba(0, 0, 0, 0.8)" }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div className="w-full max-w-screen-lg relative shadow-md overflow-y-auto">
            <div className="absolute top-0 right-0">
              <button
                className={`rounded-full w-12 h-12 p-0 border-0 inline-flex items-center justify-center text-4xl text-white opacity-70 hover:text-white hover:opacity-100`}
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <VscClose className="" onClick={() => setOpen(false)} />
              </button>
            </div>
            <button className="text-4xl absolute left-0 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
              <SlArrowLeft
                className=""
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove("l");
                }}
              />
            </button>

            <button className="text-4xl absolute  -right-0 top-[50%] cursor-pointer text-white opacity-70 hover:text-white hover:opacity-100 z-20">
              <SlArrowRight
                onClick={(e) => {
                  e.stopPropagation();
                  handleMove("r");
                }}
              />
            </button>
            <div className="sliderWrapper">
              <img
                src={galleryPhotos[sliderNumber].src}
                alt=""
                className="sliderImg"
              />
            </div>
          </div>
        </div>
      )}
      <div className="w-full justify-center items-center px- ">
        <OwlCarousel className="owl-carousel owl-theme" {...options}>
          {galleryPhotos.map((photo, index) => (
            <div key={index}>
              <img
                onClick={() => handleOpen(index)}
                src={photo.src}
                alt="gallery"
                className="hover:scale-105 duration-500 cursor-pointer"
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Gallery;
