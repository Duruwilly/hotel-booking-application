import React from "react";
import Button from "./Button";

const UpdatePassword = () => {
  const inputStyle =
    "appearance-none rounded-sm relative block w-full px-3 py-3 border border-gray-300 focus:outline-none";
  return (
    <section className="flex justify-cente">
      <div className="w-full max-w-screen-" style={{ maxWidth: "300px" }}>
        <form className="space-y- mb-32">
          <div className="mb-4">
            <label htmlFor="" style={{ color: "#A2A2A2", display: "block" }}>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block">
                Current password
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="form-input"
              //   onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" style={{ color: "#A2A2A2" }}>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block">
                New password
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="form-input"
              //   onChange={handleChange}
              required
            />
          </div>
          <p className="font-light text-xs mb-4">
            Your password must have at least eight characters and feature one
            special character, one capital letter, one number and one lower-case
            letter.
          </p>
          <div className="mb-10">
            <label htmlFor="" style={{ color: "#A2A2A2" }}>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block">
                Confirm new password
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="form-input"
              //   onChange={handleChange}
              required
            />
          </div>
          <Button text="Edit" />
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
