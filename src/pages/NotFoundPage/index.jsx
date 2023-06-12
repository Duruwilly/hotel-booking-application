import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const NotFoundPage = () => {
  useTitle("404");
  return (
    <section className="flex justify-center flex-1">
      <div className="w-full max-w-screen-lg px-4 py-20">
        <div>
          <h1 className="fone-semibold tracking-widest text-center">
            404, sorry you seem to have entered an invalid url
          </h1>
        </div>
        <div className="mt-5 text-center">
          <Link className="text-white px-4 py-2 bg-secondary rounded" to="/">
            Return back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
