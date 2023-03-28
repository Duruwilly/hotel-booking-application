import React, { useEffect, useState } from "react";
import { useAddHotelContext } from "../../context/AddhotelContext";
import Modal from "../../../../../components/Modal/Modal";
import { FaTimes } from "react-icons/fa";
import { WILL_TRIP_BASE_URL } from "../../../../../constants/base-urls";
import axios from "axios";
import { useAuthContext } from "../../../../../context/AuthContext";
import { toast } from "react-toastify";

const EditHotelModal = () => {
  const { user } = useAuthContext();
  const {
    editHotelModal,
    editHotelState,
    toggleEditHotelModal,
    setListingsData,
    listingsData,
    initializeState,
  } = useAddHotelContext();

  useEffect(() => {
    setListingsData({
      name: editHotelState?.name || "",
      destination: editHotelState?.destination || "",
      feature: editHotelState?.feature || "",
      address: editHotelState?.address || "",
      price: editHotelState?.price || "",
      overview: editHotelState?.overview || "",
      facilities: editHotelState?.facilities || "",
      foods_and_drinks: editHotelState?.foods_and_drinks || "",
      location: editHotelState?.location || "",
      photos: editHotelState?.photos || [],
    });
  }, [editHotelState]);

  const handleChange = (e) => {
    setListingsData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submitEditHotelsListing = async () => {
    let url = `${WILL_TRIP_BASE_URL}/hotels/merchant/${editHotelState._id}`;
    try {
      let res = await axios.put(
        url,
        { ...listingsData },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data.status === "success") {
        toast.success(res?.data?.msg);
        initializeState();
        toggleEditHotelModal();
      }
    } catch (error) {
      toast.error(error?.data?.response.message);
    }
  };

  return (
    <>
      {editHotelModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-screen relative shadow-md overflow-y-auto">
              <FaTimes
                onClick={() => toggleEditHotelModal()}
                className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
              />
              <form
                className="py-24 px-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitEditHotelsListing();
                }}
              >
                <div className="space-y-6">
                  <div className="flex modalInputs gap-5">
                    <div className="w-full">
                      <label htmlFor="">Name of the Hotel</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter Hotel name"
                        id="name"
                        value={listingsData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter destination eg. Lagos, nigeria"
                        id="destination"
                        value={listingsData.destination}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex modalInputs gap-5">
                    <div className="w-full">
                      <label htmlFor="">minimum price per night</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter price"
                        id="price"
                        value={listingsData.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">
                        Featured offer <small>(if available)</small>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter package"
                        id="feature"
                        value={listingsData.feature}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex modalInputs gap-5">
                    <div className="w-full">
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter address"
                        id="address"
                        value={listingsData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Brief description of the location</label>
                    <textarea
                      name="location"
                      id="location"
                      placeholder="Write a brief description of the location and it's surrounding environment"
                      className="form-input"
                      value={listingsData.location}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="">Brief summary of the hotel</label>
                    <textarea
                      name="overview"
                      id="overview"
                      placeholder="Write a brief summary of the hotel"
                      className="form-input"
                      value={listingsData.overview}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="">Brief summary of the facilities</label>
                    <textarea
                      name="facilities"
                      id="facilities"
                      placeholder="Write a brief summary of the hotel facilities"
                      className="form-input"
                      value={listingsData.facilities}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="">
                      Brief summary of the food and drinks
                    </label>
                    <textarea
                      name="foods_and_drinks"
                      id="foods_and_drinks"
                      placeholder="Write a brief summary of the foods and drinks in the hotel"
                      className="form-input"
                      value={listingsData.foods_and_drinks}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="">
                      Add images (
                      <small>First image is the title picture</small>)
                    </label>
                    <input
                      type="file"
                      id="photos"
                      className="form-input"
                      placeholder="Upload images"
                      accept=".jpg,.png,.jpeg"
                      multiple
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-light cursor-pointer w-full"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditHotelModal;
