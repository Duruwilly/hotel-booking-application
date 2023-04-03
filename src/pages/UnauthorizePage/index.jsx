import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const Unauthorize = () => {
  useTitle("unauthorize");
  return (
    <section className="flex justify-center items-cente">
      <div className="w-full max-w-screen-lg px-4 py-20">
        <div>
          <h1 className="font-semibold tracking-widest text-center">
            Sorry, you do not have access to this page
          </h1>
          <p className="text-center tracking-wider">
            If this is not right, kindly contact support
          </p>
        </div>
        <div className="mt-5 text-center">
          <Link className="text-red-900" to="/">
            Return back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Unauthorize;
