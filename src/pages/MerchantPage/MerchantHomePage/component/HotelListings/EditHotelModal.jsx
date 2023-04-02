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
  const [editListingHotel, setEditListingHotel] = useState({
    name: "",
    destination: "",
    feature: "",
    address: "",
    price: "",
    overview: "",
    facilities: "",
    foods_and_drinks: "",
    location: "",
    photos: [],
  });

  useEffect(() => {
    setEditListingHotel({
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
    if (!e.target.files) {
      setEditListingHotel((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    if (e.target.files) {
      setEditListingHotel((prev) => ({
        ...prev,
        photos: e.target.files,
      }));
    }
  };

  const submitEditHotelsListing = async () => {
    let url = `${WILL_TRIP_BASE_URL}/hotels/merchant/${editHotelState._id}`;

    const formData = new FormData();
    formData.append("name", editListingHotel.name);
    formData.append("destination", editListingHotel.destination);
    formData.append("feature", editListingHotel.feature);
    formData.append("address", editListingHotel.address);
    formData.append("price", editListingHotel.price);
    formData.append("overview", editListingHotel.overview);
    formData.append("facilities", editListingHotel.facilities);
    formData.append("foods_and_drinks", editListingHotel.foods_and_drinks);
    formData.append("location", editListingHotel.location);

    for (let i = 0; i < editListingHotel.photos.length; i++) {
      formData.append("photos", editListingHotel.photos[i]);
    }

    try {
      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
                className="py-14 px-8"
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
                        value={editListingHotel.name}
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
                        value={editListingHotel.destination}
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
                        value={editListingHotel.price}
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
                        value={editListingHotel.feature}
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
                        value={editListingHotel.address}
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
                      value={editListingHotel.location}
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
                      value={editListingHotel.overview}
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
                      value={editListingHotel.facilities}
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
                      value={editListingHotel.foods_and_drinks}
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
