import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { getCountries } from "../../../utils/getCountries";
import MobileNumberAttachment from "./MobileNumberAttachment";
import Button from "./Button";
import EmailAttachment from "./EmailAttachment";
import axios from "axios";
import { WILL_TRIP_BASE_URL } from "../../../constants/base-urls";
import { toast } from "react-toastify";
import { useUserProfileContext } from "../../../context/UserProfileContext";
import Spinner from "../../../components/Spinner/Spinner";

const PersonalDetails = () => {
  const { user } = useAuthContext();
  const { getUserDetails, userProfileDetails, loadingState, setFetchingState } =
    useUserProfileContext();
  const [currWin, setCurrWin] = useState(true);
  useEffect(() => {
    setFetchingState("idle");
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [user.token]);

  const [screenMatches, setScreenMatches] = useState(
    window.matchMedia("(min-width: 1023px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1023px)")
      .addEventListener("change", (e) => setScreenMatches(e.matches));

    return () => {
      window
        .matchMedia("(min-width: 1023px)")
        .removeEventListener("change", (e) => setScreenMatches(e.matches));
    };
  }, []);

  return (
    <>
      {loadingState ? (
        <Spinner />
      ) : (
        currWin === true && (
          <section className=" space-y-7 mb-32">
            <div className="flex">
              <p className="font-semibold" style={{ flex: 1 }}>
                Full Name
              </p>
              <span className="capitalize font-light" style={{ flex: 2 }}>
                {userProfileDetails?.fullname}
              </span>
            </div>
            <div className="flex">
              <p className="font-semibold" style={{ flex: 1 }}>
                Country
              </p>
              <span className="capitalize font-light" style={{ flex: 2 }}>
                {userProfileDetails?.country}
              </span>
            </div>
            <div className="flex">
              <p className="font-semibold" style={{ flex: 1 }}>
                Gender
              </p>
              <span className="capitalize font-light" style={{ flex: 2 }}>
                {userProfileDetails?.gender}
              </span>
            </div>
            <div className="flex">
              <p className="font-semibold" style={{ flex: 1 }}>
                Phone Number
              </p>
              <span className="capitalize font-light" style={{ flex: 2 }}>
                {userProfileDetails?.mobileNumber}
              </span>
            </div>
            {userProfileDetails?.otherMobileNumber &&
            userProfileDetails?.otherMobileNumber?.length > 0
              ? userProfileDetails?.otherMobileNumber.map((mobile) => (
                  <div className="flex" key={mobile._id}>
                    <p className="font-semibold" style={{ flex: 1 }}>
                      Secondary Phone Number
                    </p>
                    <span className="capitalize font-light" style={{ flex: 2 }}>
                      {mobile?.value}
                    </span>
                  </div>
                ))
              : null}
            <div className="flex">
              <p className="font-semibold" style={{ flex: 1 }}>
                Email
              </p>
              <span className="capitalize font-light" style={{ flex: 2 }}>
                {userProfileDetails?.email}
              </span>
            </div>
            {userProfileDetails?.otherEmail &&
            userProfileDetails?.otherEmail?.length > 0
              ? userProfileDetails?.otherEmail?.map((email) => (
                  <div className="flex" key={email?._id}>
                    <p className="font-semibold" style={{ flex: 1 }}>
                      Secondary Email
                    </p>
                    <span className="capitalize font-light" style={{ flex: 2 }}>
                      {email?.value}
                    </span>
                  </div>
                ))
              : null}
            <button
              className="py-3 px-7 text-white hover:opacity-80 transition duration-700 ease-in-out"
              style={{ background: "#182428" }}
              onClick={() => {
                setCurrWin(false);
              }}
            >
              Edit
            </button>
          </section>
        )
      )}
      <EditProfile
        currWin={currWin}
        setCurrWin={setCurrWin}
        user={user}
        userProfileDetails={userProfileDetails}
      />
    </>
  );
};

export default PersonalDetails;

const EditProfile = ({
  currWin,
  setCurrWin,
  user,
  userProfileDetails,
  setFetchingState,
}) => {
  const [countries, setCountries] = useState([]);

  const [loading, setLoading] = useState(false);
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
    fullname: userProfileDetails?.fullname,
    country: userProfileDetails?.country,
    email: userProfileDetails?.email,
    mobileNumber: userProfileDetails?.mobileNumber,
    gender: userProfileDetails?.gender,
    otherMobileNumber: [],
    otherEmail: [],
  });

  let {
    fullname,
    country,
    email,
    mobileNumber,
    gender,
    otherMobileNumber,
    otherEmail,
  } = userDetails;

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${WILL_TRIP_BASE_URL}/users/${user.id}`,
        {
          fullname: fullname,
          country: country,
          email: email,
          mobileNumber: mobileNumber,
          gender: gender,
          otherMobileNumber:
            otherMobileNumber.length > 0
              ? otherMobileNumber
              : userProfileDetails?.otherMobileNumber,
          otherEmail:
            otherEmail.length > 0 ? otherEmail : userProfileDetails?.otherEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.msg);
      setFetchingState("idle");
      setCurrWin(true);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {currWin === false && (
        <section className="flex">
          <div className="w-full max-w-screen-md mb-16">
            <form onSubmit={updateProfile}>
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
                    name="fullname"
                    value={userDetails.fullname}
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
                  <label htmlFor="">Select country</label>
                  <select
                    name="country"
                    id="country"
                    className="form-input text-sm"
                    onChange={handleChange}
                  >
                    <option value="">{userDetails.country}</option>
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
                          name="mobileNumber"
                          value={userDetails.mobileNumber}
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
                {userProfileDetails?.otherMobileNumber &&
                userProfileDetails?.otherMobileNumber?.length > 0
                  ? userProfileDetails?.otherMobileNumber.map((mobile) => (
                      <div
                        className="py-5 w-full"
                        style={{ maxWidth: "300px" }}
                        key={mobile._id}
                      >
                        <label htmlFor="">Mobile Number</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={mobile?.value}
                          className="form-input"
                          onChange={handleChange}
                          required
                        />

                        <span className="text-sm">Secondary</span>
                      </div>
                    ))
                  : null}

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
                      name="email"
                      value={userDetails.email}
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
                {userProfileDetails?.otherEmail &&
                userProfileDetails?.otherEmail?.length > 0
                  ? userProfileDetails?.otherEmail.map((email) => (
                      <div
                        className="py-5 w-full"
                        style={{ maxWidth: "300px" }}
                        key={email._id}
                      >
                        <label htmlFor="">Email Address</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          value={email?.value}
                          className="form-input"
                          onChange={handleChange}
                          required
                        />
                        <span className="text-sm">Secondary</span>
                      </div>
                    ))
                  : null}
              </div>
              <div className="mt-5 flex justify-between">
                <Button text={loading ? "Loading..." : "Save Changes"} />
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
