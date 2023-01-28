import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";

const RegisterPage = () => {
  const inputStyle =
    "appearance-none rounded-sm relative block w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-input-border";

  const [showPassword, setShowPassword] = useState(false);
  const passwordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <section className="py-5">
      <main className="flex items-center justify-center">
        <div className="max-w-4xl w-full px-4">
          <div className="max-w-4xl w-full space-y-5">
            <h2 className="text-center text-xl font-medium">
              Create a free account
            </h2>
            <form className="space-y-2">
              <input
                type="name"
                placeholder="Full Name"
                id="userName"
                name="userName"
                className={inputStyle}
              />
              <input
                type="text"
                placeholder="Country"
                id="country"
                name="country"
                className={inputStyle}
              />
              <input
                type="email"
                placeholder="Email address"
                autoComplete="email"
                id="email"
                name="email"
                className={inputStyle}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  className={inputStyle}
                />
                {showPassword && (
                  <FaEye
                    className="absolute top-5 right-1 mr-2 cursor-pointer"
                    size={15}
                    color="#1e1e1e"
                    onClick={passwordToggle}
                  />
                )}
                {!showPassword && (
                  <FaEyeSlash
                    className="absolute top-5 right-1 mr-2 cursor-pointer"
                    size={15}
                    color="#1e1e1e"
                    onClick={passwordToggle}
                  />
                )}
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                id="mobileNumber"
                name="mobileNumber"
                className={inputStyle}
              />
              <RegisterSignupBtn text="Sign up" />
            </form>

            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-red-900 hover:text-red-700 underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-center text-sm">
              <Link to="/term-and-condition">
                By continuing you agree to the Policy and Rules of WillTrip
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default RegisterPage;
