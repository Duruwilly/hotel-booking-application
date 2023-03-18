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

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/users/resetpassword/${resetToken}`,
        {
          password: password,
        }
      );
      console.log(res);
      setLoading(false);
      toast.success("successfully changed Password. Kindly login again");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data.message);
    }
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
              {/* <button
                onClick={resetPassword}
                className="group relative w-full flex justify-center py-3 px-4 font-medium rounded-sm text-white bg-red-900 focus:outline-none"
              >
                Retrieve password
              </button> */}
              <RegisterSignupBtn text="Retrieve password" />
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
