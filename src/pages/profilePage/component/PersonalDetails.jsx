import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { getCountries } from "../../../utils/getCountries";
import MobileNumberAttachment from "./MobileNumberAttachment";
import Button from "./Button";
import EmailAttachment from "./EmailAttachment";

const PersonalDetails = () => {
  const { user } = useAuthContext();

  //   const email = "hi@gmail.com";

  //   const resData = {
  //     fullname: "hello",
  //     email: "hi@gmail.com",
  //   };
  //   console.log(Object.values(resData)[1] === email);
  //   if (Object.values(resData))
  const [currWin, setCurrWin] = useState(true);
  return (
    <>
      {currWin === true && (
        <section className=" space-y-7 mb-32">
          <div className="flex">
            <p className="font-semibold" style={{ flex: 1 }}>
              Full Name
            </p>
            <span className="capitalize font-light" style={{ flex: 6 }}>
              {user.fullname}
            </span>
          </div>
          <div className="flex">
            <p className="font-semibold" style={{ flex: 1 }}>
              Country
            </p>
            <span className="capitalize font-light" style={{ flex: 6 }}>
              {user.country}
            </span>
          </div>
          <div className="flex">
            <p className="font-semibold" style={{ flex: 1 }}>
              Gender
            </p>
            <span className="capitalize font-light" style={{ flex: 6 }}>
              {user?.gender}
            </span>
          </div>
          <div className="flex">
            <p className="font-semibold" style={{ flex: 1 }}>
              Phone Number
            </p>
            <span className="capitalize font-light" style={{ flex: 6 }}>
              {user?.mobileNumber}
            </span>
          </div>
          <div className="flex">
            <p className="font-semibold" style={{ flex: 1 }}>
              Email
            </p>
            <span className="capitalize font-light" style={{ flex: 6 }}>
              {user?.email}
            </span>
          </div>
          <button
            className="py-3 px-7 text-white hover:opacity-80 transition duration-700 ease-in-out"
            style={{ background: "#182428" }}
            onClick={() => setCurrWin(false)}
          >
            Edit
          </button>
        </section>
      )}
      <EditProfile currWin={currWin} setCurrWin={setCurrWin} user={user} />
    </>
  );
};

export default PersonalDetails;

const EditProfile = ({ currWin, setCurrWin, user }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const [attachmentState, setAttachmentState] = useState({
    mobileNumberAttachments: [],
    emailAttachments: [],
  });

  const [userDetails, setUserDetails] = useState({
    fullname: "",
    country: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    otherMobileNumber: [],
    otherEmail: [],
  });

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.id]: console.log(e.target.value),
    }));
  };

  return (
    <>
      {currWin === false && (
        <section className="flex">
          <div className="w-full max-w-screen-md mb-16">
            <form action="">
              <div className=" border border-gray-300 px-5 pt-4 pb-8">
                <h1 className="capitalize text-2xl font-light">
                  your personal details
                </h1>

                <div className="py-5 w-full" style={{ maxWidth: "300px" }}>
                  <label htmlFor="">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                      Full name
                    </span>
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name=""
                    value={user.fullname}
                    className="form-input"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="py-5">
                  <p className="mb-3">Gender</p>
                  <label htmlFor="male" className="pr-2 font-light">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleChange}
                    />{" "}
                    Male
                  </label>
                  <label htmlFor="female" className="px-2 font-light">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleChange}
                    />{" "}
                    Female
                  </label>
                  <label htmlFor="other" className="font-light">
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={handleChange}
                    />{" "}
                    Other
                  </label>
                </div>
                <div className="py-5 w-full" style={{ maxWidth: "300px" }}>
                  <label htmlFor="">Country</label>
                  <select
                    name="country"
                    id="country"
                    className="form-input text-sm"
                    onChange={handleChange}
                  >
                    <option value="">{user.country}</option>
                    {countries?.map((country, index) => (
                      <option value={country?.name} key={index}>
                        {country?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-5">
                  <div className="flex justify-between">
                    <label htmlFor="">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                        Mobile number
                      </span>
                    </label>
                    <span
                      className="text-red-900 font-semibold text-sm cursor-pointer"
                      onClick={() => {
                        var add = {
                          key: 1,
                        };

                        if (
                          attachmentState?.mobileNumberAttachments.length >= 1
                        ) {
                          var ind =
                            attachmentState?.mobileNumberAttachments[
                              attachmentState?.mobileNumberAttachments.length -
                                1
                            ].key + 1;

                          add = {
                            key: ind,
                          };
                        }

                        return setAttachmentState((state) => {
                          return {
                            ...state,
                            mobileNumberAttachments: [
                              ...attachmentState?.mobileNumberAttachments,
                              add,
                            ],
                          };
                        });
                      }}
                    >
                      + Add new
                    </span>
                  </div>
                  <div className="py- w-full" style={{ maxWidth: "300px" }}>
                    <div className="fle">
                      <div>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name=""
                          value={user.mobileNumber}
                          className="form-input"
                          onChange={handleChange}
                          required
                        />
                        <span className="text-sm">Primary</span>
                      </div>
                      {attachmentState?.mobileNumberAttachments.map(
                        (item, index) => (
                          <MobileNumberAttachment
                            key={item.key}
                            attachmentState={attachmentState}
                            ind={item.key}
                            setAttachmentState={setAttachmentState}
                            handleChange={handleChange}
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <div className="flex justify-between">
                    <label htmlFor="">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-900 block">
                        Email Address
                      </span>
                    </label>
                    <span
                      className="text-red-900 font-semibold text-sm"
                      onClick={() => {
                        var add = {
                          key: 1,
                        };

                        if (attachmentState?.emailAttachments.length >= 1) {
                          var ind =
                            attachmentState?.emailAttachments[
                              attachmentState?.emailAttachments.length - 1
                            ].key + 1;

                          add = {
                            key: ind,
                          };
                        }

                        return setAttachmentState((state) => {
                          return {
                            ...state,
                            emailAttachments: [
                              ...attachmentState?.emailAttachments,
                              add,
                            ],
                          };
                        });
                      }}
                    >
                      + Add new
                    </span>
                  </div>
                  <div className="py- w-full" style={{ maxWidth: "300px" }}>
                    <input
                      type="email"
                      id="email"
                      name=""
                      value={user.email}
                      className="form-input"
                      onChange={handleChange}
                      required
                    />
                    <span className="text-sm">Primary</span>
                    {attachmentState?.emailAttachments.map((item, index) => (
                      <EmailAttachment
                        key={item.key}
                        attachmentState={attachmentState}
                        ind={item.key}
                        setAttachmentState={setAttachmentState}
                        handleChange={handleChange}
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                <Button text="Save Changes" />
                <button
                  className="py-3 px-14 border border-black rounded-sm"
                  onClick={() => setCurrWin(true)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
