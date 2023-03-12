import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { popularSearch3Bg } from "../../BgImageStyles/styles";

const BookWithUs = () => {
  return (
    <>
      <div style={popularSearch3Bg}>
        <div className="overlay">
          <h1 className="capitalize text-2xl mb-5">why book with us?</h1>
          <p className="lowercase text-lg">your friend with benefits</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg mt-4 px-4">
          <div className="flex items-center gap-4">
            <Link to="/about-us" className="text-gray-500">
              About us
            </Link>
            <MdOutlineArrowForwardIos className="text-gray-500" />
            <span>Why book with us?</span>
          </div>
        </div>
      </div>
      <section className="flex flex-col items-center justify-center">
        <article className="w-3/4 max-w-screen-lg mt-14">
          <p>
            Right from that very first hotel guidebook we published, we've
            wanted to put the world at your feet; to send you on trips you'll
            truly treasure. As such, we go out of our way to make sure our
            members get the best possible experience from browsing to booking to
            bedding down and beyond
          </p>
        </article>
        <article className="w-3/4 max-w-screen-lg my-4">
          <p className="font-semibold text-lg">
            More reasons why you should book with us
          </p>
          <ol className="leading-8">
            <li>Personalised service from our in-house travel specialists.</li>
            <li>
              Each hotel is hand-picked by our experts and reviewed by
              undercover tastemakers.
            </li>
            <li>Up to 50% off Will Trip hotels all year round.</li>
            <li>Best-Price guarantee.</li>
          </ol>
        </article>
      </section>
    </>
  );
};

export default BookWithUs;
