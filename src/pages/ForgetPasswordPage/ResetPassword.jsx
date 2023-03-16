import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const location = useLocation();
  console.log(resetToken);
  console.log(password);

  const resetPassword = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // try {
    //   const res = await axios.post(
    //     `${WILL_TRIP_BASE_URL}/resetpassword/${resetToken}`,
    //     {
    //       password: password,
    //     }
    //   );
    //   setLoading(false);
    //   toast.success(res.data);
    //   navigate("/");
    // } catch (error) {
    //   setLoading(false);
    //   toast.error(error.response?.data.message);
    // }
    console.log("hello");
  };

  return (
    <section className="py-5">
      <main className="flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
          <div className="max-w-2xl w-full space-y-8 mt-12">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <form className="space-y-" onSubmit={resetPassword}>
              <label htmlFor="" className="font-semibold">
                Enter your new password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                className="form-input mb-5"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <RegisterSignupBtn
                text={loading ? "Loading..." : "Retrieve password"}
              />
            </form>
            <p className="text-center">OR</p>
            <p className="text-center">
              <Link to="/login" className="font-medium text-red-900 underline">
                return back to sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ResetPassword;
