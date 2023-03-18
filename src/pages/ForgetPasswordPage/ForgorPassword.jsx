import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSignupBtn } from "../../components/button/RegisterSignupBtn";
import { WILL_TRIP_BASE_URL } from "../../constants/base-urls";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${WILL_TRIP_BASE_URL}/users/forgotPassword`,
        {
          email: email,
        }
      );
      setLoading(false);
      toast.success(res.data.message);
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
              Forgot password
            </h2>
            <form className="space-y-" onSubmit={updatePassword}>
              <label htmlFor="" className="font-semibold">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={email}
                className="form-input mb-5"
                onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
