import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSignupBtn } from "../../../components/button/RegisterSignupBtn";
import InlineErrors from "../../../components/inlineValidationErrors/InlineErrors";
import { WILL_TRIP_BASE_URL } from "../../../constants/base-urls";
import { useAuthContext } from "../../../context/AuthContext";
import { getCountries } from "../../../utils/getCountries";
import { validateEmail, validatePassword } from "../../../utils/validation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [passwordErrors, setPasswordErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const inputStyle =
    "appearance-none rounded-sm relative block w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-input-border";

  const [showPassword, setShowPassword] = useState(false);
  const passwordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { loading, error, dispatch } = useAuthContext();

  const [userDetails, setUserDetails] = useState({
    fullname: "",
    country: "",
    email: "",
    password: "",
    mobileNumber: "",
    companyName: "",
  });

  const handleChange = (e) => {
    let id = e.target?.id;
    let value = e.target?.value;

    validatePassword(e, id, value, passwordErrors, setPasswordErrors);
    validateEmail(e, id, value, emailErrors, setEmailErrors);

    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch({ type: "START" });
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/auth/merchant/register`,
        userDetails
      );
      console.log(res);
      // setLoading(false);
      dispatch({ type: "SUCCESS", payload: res.data });
      navigate("/merchant-home");
    } catch (error) {
      // setLoading(false);
      // setError(error.response.data);
      dispatch({ type: "FAILED", payload: error.response.data });
    }
  };

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  return (
    <>
      <section className="py-5">
        <main className="flex items-center justify-center">
          <div className="max-w-2xl w-full px-4">
            <div className="max-w-2xl w-full space-y-5">
              <h2 className="text-center text-xl font-medium">
                Create a free account
              </h2>
              <form className="space-y-2" onSubmit={handleLogin}>
                <input
                  type="name"
                  placeholder="Full Name"
                  id="fullname"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Enter Company's name"
                  id="companyName"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                {/* <select name="role" id="role"  defaultValue="merchant" className="form-input text-sm">
                <option value="merchant" >
                  Merchant user
                </option>
              </select> */}
                <select
                  name="country"
                  id="country"
                  required
                  className={`${inputStyle} text-sm`}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  {countries?.map((country, index) => (
                    <option value={country?.name} key={index}>
                      {country?.name}
                    </option>
                  ))}
                </select>
                <input
                  type="email"
                  placeholder="Email address"
                  id="email"
                  name="email"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                {emailErrors.emailError && (
                  <InlineErrors error={emailErrors.emailError} />
                )}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    className={inputStyle}
                    onChange={handleChange}
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
                {passwordErrors.password && (
                  <InlineErrors error={passwordErrors.password} />
                )}
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  id="mobileNumber"
                  name="mobileNumber"
                  required
                  className={inputStyle}
                  onChange={handleChange}
                />
                <RegisterSignupBtn
                  disabled={
                    userDetails.email === "" &&
                    userDetails.fullname === "" &&
                    userDetails.country === "" &&
                    userDetails.mobileNumber === "" &&
                    userDetails.password === ""
                  }
                  text={loading ? "loading..." : "Sign up"}
                />
              </form>
              {error && (
                <p className="text-red-700 text-center">{error.message}</p>
              )}
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/merchant-login"
                  className="font-medium text-red-900 hover:text-red-700 underline"
                >
                  Sign in{" "}
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
    </>
  );
};

export default RegisterPage;
