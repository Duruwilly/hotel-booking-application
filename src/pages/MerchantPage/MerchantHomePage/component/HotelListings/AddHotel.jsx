import React from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../../../../components/Modal/Modal";
import { useAddHotelContext } from "../../context/AddhotelContext";

const CreateHotelForm = () => {
  const {
    openAddModal,
    toggleModal,
    listingsData,
    addHotelOnChange,
    submitListings,
    requestStatus,
  } = useAddHotelContext();
  return (
    <>
      {openAddModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 h-screen relative shadow-md overflow-y-auto">
              <FaTimes
                onClick={() => toggleModal()}
                className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
              />
              <form
                className="py-14 px-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitListings();
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
                        onChange={addHotelOnChange}
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
                        onChange={addHotelOnChange}
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
                        onChange={addHotelOnChange}
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
                        onChange={addHotelOnChange}
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
                        onChange={addHotelOnChange}
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
                      onChange={addHotelOnChange}
                    ></textarea>
                  </div>
                  <div>
                    <label>Brief summary of the hotel</label>
                    <textarea
                      name="overview"
                      id="overview"
                      placeholder="Write a brief summary of the hotel"
                      className="form-input"
                      value={listingsData.overview}
                      onChange={addHotelOnChange}
                    ></textarea>
                  </div>
                  <div>
                    <label>Brief summary of the facilities</label>
                    <textarea
                      name="facilities"
                      id="facilities"
                      placeholder="Write a brief summary of the hotel facilities"
                      className="form-input"
                      value={listingsData.facilities}
                      onChange={addHotelOnChange}
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
                      onChange={addHotelOnChange}
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
                      style={{
                        color: "#495057",
                        backgroundClip: "padding-box",
                      }}
                      placeholder="Upload images"
                      accept=".jpg,.png,.jpeg"
                      multiple
                      onChange={addHotelOnChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={requestStatus === "pending"}
                      className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-light cursor-pointer w-full"
                    >
                      {requestStatus === "pending" ? "submitting..." : "submit"}
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

export default CreateHotelForm;
