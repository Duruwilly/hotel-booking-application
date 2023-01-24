import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { popularSearch2Bg, aboutBg } from "../../BgImageStyles/styles";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={aboutBg}>
        <div className="overlay">
          <h1>about us</h1>
          <p>what's in the name?</p>
        </div>
      </div>
      <section className="flex justify-center">
        <article className="w-3/4 max-w-screen-lg mt-6">
          <p className="mb-6">
            If you're reading this, it's probably because you're a adventure
            lover. Or hotel curious at least. But before we get to the objects
            of our affection, allow us to introduce ourselves…
          </p>
          <p className="mt-8 mb-3">
            Will Trip began life in laties with two adventurous enthusiast and
            has evolved into a global travel club with more than a million
            like-minded members.
          </p>
          {open && (
            <div>
              <p className="my-6">
                Our carefully curated of hotels are responsibly sourced if
                you've never woken up in a treehouse, we can change that, hotels
                in caves, hotels above water, hotels underwater (well,
                partially), hotels a million miles away, hotels on your doorstep
                including tourist attractions
              </p>
              <p>
                It's no accident that the collections are so special. Every
                hotel is visited by our team and anonymously reviewed by a
                diverse bunch of trusted tastemakers.
              </p>
              <p className="my-6">
                Our work doesn't stop with considered curation, mind. We ensure
                that our members receive the very best service, support and
                inspiration. It's what makes us the travel club for adventure
                lovers. And if every club has a purpose, ours is to knock your
                socks off – with help from the world's very best bedrooms…
              </p>
            </div>
          )}

          <div
            className="flex gap-4 cursor-pointer justify-center items-center"
            onClick={() => setOpen(!open)}
          >
            {open === true ? (
              <>
                <p className="uppercase text-center font-semibold">read less</p>
                <MdOutlineKeyboardArrowUp />
              </>
            ) : (
              <>
                <p className="uppercase text-center font-semibold">read more</p>
                <MdOutlineKeyboardArrowDown />
              </>
            )}
          </div>
        </article>
      </section>
      <section className="flex justify-center mt-4">
        <article className="w-full max-w-screen-lg px-4">
          <div style={popularSearch2Bg}>
            <div className="overlay">
              <h1 className="uppercase text-base mb-2">why book with us?</h1>
              <p className="text-base mb-3">your friend with benefits</p>
              <Link
                to="/about-us/book-with-us"
                className="uppercase py-2 px-4 border-none bg-red-900 text-base"
              >
                read more
              </Link>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-3 text-center mt-4 text-white uppercase">
            <div className="bg-primary h-36 w-full">
              <h1 className="font-bold my-5">what our members say</h1>
              <Link to="/reviews" className="border py-2 px-4">
                read reviews
              </Link>
            </div>
            <div className="bg-primary h-36 w-full">
              <h1 className="font-bold my-5">our travel specialists</h1>
              <Link to="/travel-team" className="border py-2 px-4">
                view them
              </Link>
            </div>
          </div>
          <div className="mt-16 flex justify-center mb-4">
            <Link
              to="/contact"
              className="uppercase bg-primary py-2 px-5 text-white font-bold"
            >
              contact us
            </Link>
          </div>
        </article>
      </section>
    </>
  );
};

export default AboutUs;
