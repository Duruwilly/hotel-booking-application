import React, { useState } from "react";
import Button from "./Button";
import { omit } from "lodash";
import { WILL_TRIP_BASE_URL } from "../../../constants/base-urls";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addSuccessMessages } from "../../../redux/responseMessage";

const UpdatePassword = () => {
  const inputStyle =
    "appearance-none rounded-sm relative block w-full px-3 py-3 focus:outline-none focus:border-input-border";
  const [errors, setErrors] = useState({});
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [oldPasswordError, setOldPasswordError] = useState(false);

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    password: "",
  });

  const handleChange = (e) => {
    let id = e.target?.id;
    let value = e.target?.value;

    validatePassword(e, id, value);

    setUserPassword((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validatePassword = (e, id, value) => {
    switch (id) {
      case "newPassword":
        if (
          !new RegExp(
            /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).{8,}/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            newPassword:
              "password must contain at lease one special character, uppercase and lowercase letters with at least a number, and must be 8 character or more",
          });
        } else {
          let newObj = omit(errors, "newPassword");
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          document.getElementById("password").value !==
          document.getElementById("newPassword").value
        ) {
          setErrors({
            ...errors,
            password: "Password does not match",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${WILL_TRIP_BASE_URL}/users/update-password/${user._id}`,
        {
          oldPassword: userPassword.oldPassword,
          password: userPassword.password,
        }
      );
      setLoading(false);
      setUserPassword((state) => {
        return { ...state, newPassword: "", oldPassword: "", password: "" };
      });
      setOldPasswordError(false);
      dispatch(addSuccessMessages(res.data.msg));
    } catch (error) {
      setLoading(false);
      setOldPasswordError(error.response.data.message);
    }
  };

  return (
    <section className="flex justify-cente">
      <div className="w-full max-w-screen-" style={{ maxWidth: "300px" }}>
        <form className="space-y- mb-32" onSubmit={updatePassword}>
          <div className="mb-2">
            <label htmlFor="" style={{ color: "#A2A2A2", display: "block" }}>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                Current password
              </span>
            </label>
            <input
              type="password"
              id="oldPassword"
              value={userPassword.oldPassword}
              name="password"
              //   autoComplete="current-password"
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>
          {oldPasswordError && (
            <h3 className="text-red-800 text-xs mb-3">{oldPasswordError}</h3>
          )}
          <div className="mb-2">
            <label htmlFor="" style={{ color: "#A2A2A2" }}>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                New password
              </span>
            </label>
            <input
              type="password"
              id="newPassword"
              name="password"
              value={userPassword.newPassword}
              autoComplete="current-password"
              className={`${inputStyle} ${
                errors.newPassword
                  ? "border border-red-700"
                  : "border border-gray-300"
              }`}
              onChange={handleChange}
              required
            />
          </div>
          {errors.newPassword && (
            <h3 className="text-red-800 text-xs mb-3">{errors.newPassword}</h3>
          )}
          <p className="font-light text-xs mb-4">
            Your password must have at least eight characters and feature one
            special character, one capital letter, one number and one lower-case
            letter.
          </p>
          <div className="mb-">
            <label htmlFor="" style={{ color: "#A2A2A2" }}>
              <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                Confirm new password
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userPassword.password}
              autoComplete="current-password"
              className={`${inputStyle} ${
                errors.password
                  ? "border border-red-700"
                  : "border border-gray-300"
              }`}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && (
            <h3 className="text-red-800 text-xs mb-3">{errors.password}</h3>
          )}
          <div className="mt-7">
            <Button
              text={`${loading ? "Loading..." : "Edit"}`}
              //   disabled={
              //     Object.keys(errors).length > 0 ||
              //     userPassword.newPassword === "" ||
              //     userPassword.oldPassword === "" ||
              //     userPassword.password === ""
              //   }
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePassword;
