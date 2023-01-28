import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";

const LoginPage = () => {
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
            <h2 className="text-center text-xl font-medium">Sign in</h2>
            <form className="space-y-2">
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                className={inputStyle}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className={inputStyle}
                />
                {showPassword && (
                  <FaEye
                    className="absolute top-4 right-1 mr-2 cursor-pointer"
                    size={15}
                    color="#1e1e1e"
                    onClick={passwordToggle}
                  />
                )}
                {!showPassword && (
                  <FaEyeSlash
                    className="absolute top-4 right-1 mr-2 cursor-pointer"
                    size={15}
                    color="#1e1e1e"
                    onClick={passwordToggle}
                  />
                )}
              </div>
              <Link to="/forgot-password">
                <p className="text-right font-medium text-red-900 underline mt-1">
                  Forgot your password?
                </p>
              </Link>

              <RegisterSignupBtn text="Sign in" />
            </form>

            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-red-900 hover:text-red-700 underline"
              >
                Sign up
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

export default LoginPage;
