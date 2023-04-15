import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";
import { useBasketContext } from "../../context/BasketItemsContext";
import { useFavouriteContext } from "../../context/FavouriteItemsContext";
import { useUserProfileContext } from "../../context/UserProfileContext";
import { loginBg } from "../../BgImageStyles/styles";
import InlineErrors from "../../components/inlineValidationErrors/InlineErrors";
import { getCountries } from "../../utils/getCountries";
import { validateEmail, validatePassword } from "../../utils/validation";
import { BsTelephone } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { HiOutlineGift } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { useTitle } from "../../hooks/useTitle";

const LoginRegisterPage = () => {
  useTitle("WillTrip | login");
  const [showPassword, setShowPassword] = useState(false);
  const { setFetchStatus } = useBasketContext();
  const { setFavouriteFetchStatus } = useFavouriteContext();
  const { setFetchingState } = useUserProfileContext();
  const [activeTab, setActiveTab] = useState("login");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const passwordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };
  const { user } = useAuthContext();

  const [loginUserDetails, setLoginUserDetails] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useAuthContext();

  const handleLoginChange = (e) => {
    setLoginUserDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "START" });
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/auth/login`,
        loginUserDetails
      );
      dispatch({ type: "SUCCESS", payload: res.data });
      // setFetchStatus("idle");
      // setFavouriteFetchStatus("idle");
      setFetchingState("idle");
      // navigate("/");
      if (searchParams.get("return_url")) {
        navigate(searchParams.get("return_url"));
      }
    } catch (error) {
      dispatch({ type: "FAILED", payload: error?.response?.data });
      localStorage.removeItem("user");
    }
  };

  const [userRegisterDetails, setRegisterUserDetails] = useState({
    fullname: "",
    country: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleRegisterChange = (e) => {
    let id = e.target?.id;
    let value = e.target?.value;

    validatePassword(e, id, value, passwordErrors, setPasswordErrors);
    validateEmail(e, id, value, emailErrors, setEmailErrors);

    setRegisterUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch({ type: "START" });
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/auth/register`,
        userRegisterDetails
      );
      // setLoading(false);
      dispatch({ type: "SUCCESS", payload: res.data });
      // navigate("/");
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
      <section style={loginBg}>
        <div className="auth-overlay">
          <main className="flex items-center justify-center">
            <div className="max-w-screen-xl w-full px-4">
              <div className="register-small-screen">
                <div className="">
                  <div className="flex flex-col login-register gap-10">
                    <div style={{ flex: 2 }}>
                      <ul className="flex justify-between">
                        <li
                          className={`${
                            activeTab === "login"
                              ? "bg-white w-full text-center py-3 cursor-pointer text-black"
                              : "cursor-pointer w-full text-center py-3 text-[#999]"
                          } uppercase font-light text-sm`}
                          // style={{ color: "#999" }}
                          onClick={() => toggleTab("login")}
                        >
                          sign in
                        </li>
                        <li
                          className={`${
                            activeTab === "register"
                              ? "bg-white w-full text-center py-3 cursor-pointer text-black"
                              : "cursor-pointer w-full text-center py-3 text-[#999]"
                          } uppercase font-light text-sm`}
                          // style={{ color: "#999" }}
                          onClick={() => toggleTab("register")}
                        >
                          register
                        </li>
                      </ul>
                      <div className="bg-white p-5">
                        {activeTab === "login" && (
                          <>
                            <form className="space-y-7" onSubmit={handleLogin}>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                className="form-input"
                                onChange={handleLoginChange}
                                required
                              />
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  id="password"
                                  name="password"
                                  placeholder="Password"
                                  className="form-input"
                                  onChange={handleLoginChange}
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
                                <p className="text-right font-medium text-sm text-red-900 underline my-5">
                                  Forgot your password?
                                </p>
                              </Link>
                              <RegisterSignupBtn
                                disabled={
                                  loginUserDetails.email === undefined &&
                                  loginUserDetails.password === undefined
                                }
                                text={loading ? "loading..." : "Sign in"}
                              />
                            </form>
                            {error && (
                              <p className="text-red-700 text-center">
                                {error.message}
                              </p>
                            )}

                            <p
                              className="text-center text-sm font-medium text-red-900 hover:text-red-700 underline pt-8 cursor-pointer"
                              onClick={() => toggleTab("register")}
                            >
                              Don't have an account? sign up
                            </p>
                            {/* <p className="text-center text-sm">
                          <Link to="/term-and-condition">
                            By continuing you agree to the Policy and Rules of
                            WillTrip
                          </Link>
                        </p> */}
                          </>
                        )}
                        {activeTab === "register" && (
                          <>
                            <form
                              className="space-y-7"
                              onSubmit={handleRegister}
                            >
                              <input
                                type="name"
                                placeholder="Full Name"
                                id="fullname"
                                required
                                className="form-input"
                                onChange={handleRegisterChange}
                              />
                              <input
                                type="email"
                                placeholder="Email address"
                                id="email"
                                name="email"
                                required
                                className="form-input"
                                onChange={handleRegisterChange}
                              />
                              {emailErrors.emailError && (
                                <InlineErrors error={emailErrors.emailError} />
                              )}
                              <select
                                name="country"
                                id="country"
                                required
                                className="form-input text-sm"
                                onChange={handleRegisterChange}
                              >
                                <option value="">Select Country</option>
                                {countries?.map((country, index) => (
                                  <option value={country?.name} key={index}>
                                    {country?.name}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                placeholder="Mobile Number"
                                id="mobileNumber"
                                name="mobileNumber"
                                required
                                className="form-input"
                                onChange={handleRegisterChange}
                              />
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  id="password"
                                  name="password"
                                  required
                                  className="form-input"
                                  onChange={handleRegisterChange}
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
                              <RegisterSignupBtn
                                disabled={
                                  userRegisterDetails.email === "" &&
                                  userRegisterDetails.fullname === "" &&
                                  userRegisterDetails.country === "" &&
                                  userRegisterDetails.mobileNumber === "" &&
                                  userRegisterDetails.password === ""
                                }
                                text={loading ? "loading..." : "Sign up"}
                              />
                            </form>
                            {error && (
                              <p className="text-red-700 text-center">
                                {error.message}
                              </p>
                            )}
                            <p
                              className="text-center text-sm font-medium text-red-900 hover:text-red-700 underline pt-8 cursor-pointer"
                              onClick={() => toggleTab("login")}
                            >
                              Already have an account? sign in
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ flex: 3 }} className="">
                      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-700 pb-10">
                        <div className="text-white space-y-3">
                          <BsTelephone className="text-white text-2xl" />
                          <h2 className="uppercase text-sm tracking-wider">
                            here for you
                          </h2>
                          <p className="font-extralight">
                            For bookings, support or in-the-know inspiration,
                            call our travel specialists
                          </p>
                        </div>
                        <div className="text-white space-y-3">
                          <CiCircleCheck className="text-white text-2xl" />
                          <h2 className="uppercase text-sm tracking-wider">
                            best-price guarantee
                          </h2>
                          <p className="font-extralight">
                            Have a destination in mind? Search for your
                            favourite stay. We'll match it and give you the best
                            price
                          </p>
                        </div>
                        <div className="text-white space-y-3">
                          <HiOutlineGift className="text-white text-2xl" />
                          <h2 className="uppercase text-sm tracking-wider">
                            special package on arrival
                          </h2>
                          <p className="font-extralight">
                            Have a little something on us every time you check
                            in
                          </p>
                        </div>
                        <div className="text-white space-y-3">
                          <BsPersonCircle className="text-white text-2xl" />
                          <h2 className="uppercase text-sm tracking-wider">
                            personally approved hotels
                          </h2>
                          <p className="font-extralight">
                            Every hotel is visited by us and anonymously
                            reviewed
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-white">
                        <h2 className="uppercase text-xs">
                          are you an hotelier?
                        </h2>
                        <Link
                          to="/merchant-register"
                          className="font-extralight underline"
                        >
                          become a merchant here...
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
    // <section className="py-5">
    //   <main className="flex items-center justify-center">
    //     <div className="max-w-2xl w-full px-4">
    //       <div className="max-w-2xl w-full space-y-5">
    //         <h2 className="text-center text-xl font-medium">
    //           Sign in or as a{" "}
    //           <Link
    //             to="/merchant-login"
    //             className="font-medium text-red-900 hover:text-red-700 underline"
    //           >
    //             merchant
    //           </Link>
    //         </h2>
    //         <form className="space-y-2" onSubmit={handleLogin}>
    //           {/* <input type="hidden" name="remember" defaultValue="true" /> */}
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             placeholder="Email address"
    //             className={inputStyle}
    //             onChange={handleChange}
    //             required
    //           />
    //           <div className="relative">
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               id="password"
    //               name="password"
    //               placeholder="Password"
    //               className={inputStyle}
    //               onChange={handleChange}
    //               required
    //             />
    //             {showPassword && (
    //               <FaEye
    //                 className="absolute top-4 right-1 mr-2 cursor-pointer"
    //                 size={15}
    //                 color="#1e1e1e"
    //                 onClick={passwordToggle}
    //               />
    //             )}
    //             {!showPassword && (
    //               <FaEyeSlash
    //                 className="absolute top-4 right-1 mr-2 cursor-pointer"
    //                 size={15}
    //                 color="#1e1e1e"
    //                 onClick={passwordToggle}
    //               />
    //             )}
    //           </div>
    //           <Link to="/forgot-password">
    //             <p className="text-right font-medium text-red-900 underline mt-1">
    //               Forgot your password?
    //             </p>
    //           </Link>

    //           <RegisterSignupBtn
    //             disabled={
    //               userDetails.email === undefined &&
    //               userDetails.password === undefined
    //             }
    //             text={loading ? "loading..." : "Sign in"}
    //           />
    //         </form>
    //         {error && (
    //           <p className="text-red-700 text-center">{error.message}</p>
    //         )}

    //         <p className="text-center">
    //           Don't have an account?{" "}
    //           <Link
    //             to="/register"
    //             className="font-medium text-red-900 hover:text-red-700 underline"
    //           >
    //             Sign up
    //           </Link>{" "}
    //         </p>
    //         <p className="text-center text-sm">
    //           <Link to="/term-and-condition">
    //             By continuing you agree to the Policy and Rules of WillTrip
    //           </Link>
    //         </p>
    //       </div>
    //     </div>
    //   </main>
    // </section>
  );
};

export default LoginRegisterPage;
