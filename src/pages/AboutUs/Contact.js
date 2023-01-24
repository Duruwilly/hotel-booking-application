import React from "react";
import { popularSearch2Bg } from "../../BgImageStyles/styles";

const Contact = () => {
  return (
    <>
      <div style={popularSearch2Bg}>
        <div className="overlay">
          <h1 className="capitalize">The travel club for adventure lovers</h1>
          <p className="capitalize">Contact us</p>
        </div>
      </div>
      <section className="flex justify-center mt-5 px-4">
        <article className="w-full max-w-screen-lg">
          <p>Amendments and cancellations:</p>
          <p>
            you can speak to a travel specialist during the following
            hours:
          </p>
          <div className="mt-4">
            <p>Opening hours</p>
            <p>Monday - Friday 07:00 - 20:00</p>
            <p>Sat 09:00 - 17:30</p>
            <p>Sun 09:00 - 16:00</p>
          </div>
          <h3 className="my-6">Contacting us</h3>
          <ul>
            <li>
              Want to make a booking?{" "}
              <a
                href="mailto:duruprincewilluzochukwu@gmail.com"
                className="text-red-900 font-bold"
              >
                {" "}
                Just give us the details
              </a>
            </li>
            <li>
              Need help with a booking you've already made?
              <a
                href="mailto:duruprincewilluzochukwu@gmail.com"
                className="text-red-900 font-bold"
              >
                {" "}
                We can help
              </a>
            </li>
            <li>
              Are you an agent wishing to book through us?
              <a
                href="mailto:duruprincewilluzochukwu@gmail.com"
                className="text-red-900 font-bold"
              >
                {" "}
                Find out more
              </a>
            </li>
          </ul>
          <ul className="mt-5 mb-4">
            <p className="text-gray-600">Will Trip Global Ltd</p>
            <li>Registered address: White Hart Associates (London) Limited</li>
            <li>2nd Floor Nucleus House</li>
            <li>2 Lower Mortlake Road</li>
            <li>Richmond</li>
            <li>TW9 2JA</li>
            <li>United Kingdom</li>
          </ul>
        </article>
      </section>
    </>
  );
};

export default Contact;
