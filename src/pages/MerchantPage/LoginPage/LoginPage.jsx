import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSignupBtn } from "../../../components/button/RegisterSignupBtn";
import { WILL_TRIP_BASE_URL } from "../../../constants/base-urls";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import { useTitle } from "../../../hooks/useTitle";

const LoginPage = () => {
  useTitle("WillTrip | merchant login");
  const [showPassword, setShowPassword] = useState(false);

  const { setFetchingState } = useUserProfileContext();

  const passwordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [userDetails, setUserDetails] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useAuthContext();

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "START" });
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/auth/merchant/login`,
        userDetails
      );
      dispatch({ type: "SUCCESS", payload: res.data });
      setFetchingState("idle");
      navigate("/merchant-home");
    } catch (error) {
      dispatch({ type: "FAILED", payload: error?.response?.data });
      localStorage.removeItem("user");
    }
  };

  return (
    <section className="py-5">
      <main className="flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
          <div className="max-w-2xl w-full space-y-5">
            <h2 className="text-center text-xl font-medium">Sign in</h2>
            <form className="space-y-2" onSubmit={handleLogin}>
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                className="form-input"
                onChange={handleChange}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                  onChange={handleChange}
                  required
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

              <RegisterSignupBtn
                disabled={
                  userDetails.email === undefined &&
                  userDetails.password === undefined
                }
                text={loading ? "loading..." : "Sign in"}
              />
            </form>
            {error && (
              <p className="text-red-700 text-center">{error.message}</p>
            )}

            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/merchant-register"
                className="font-medium text-red-900 hover:text-red-700 underline"
              >
                Sign up
              </Link>
            </p>
            {/* <p className="text-center text-sm">
              <Link to="/term-and-condition">
                By continuing you agree to the Policy and Rules of WillTrip
              </Link>
            </p> */}
          </div>
        </div>
      </main>
    </section>
  );
};

export default LoginPage;
