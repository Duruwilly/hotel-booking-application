import React from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../../../../components/Modal/Modal";
import { useAddHotelContext } from "../../context/AddhotelContext";

const AddRooms = () => {
  const {
    openAddRoomsModal,
    addRoomsModal,
    roomsListings,
    addRooms,
    addRoomsOnChange,
    setRoomsListings,
  } = useAddHotelContext();
  return (
    <>
      {openAddRoomsModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 relative shadow-md overflow-y-auto">
              <FaTimes
                onClick={() => addRoomsModal()}
                className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
              />
              <form
                className="py-14 px-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  addRooms();
                }}
              >
                <div className="space-y-6">
                  <div className="flex modalInputs gap-5">
                    <div className="w-full">
                      <label htmlFor="">Title of the room</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter room title eg. executive"
                        id="title"
                        value={roomsListings.title}
                        onChange={addRoomsOnChange}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Price per night</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter price for this particular room"
                        id="price"
                        value={roomsListings.price}
                        onChange={addRoomsOnChange}
                      />
                    </div>
                  </div>
                  <div className="flex modalInputs gap-5">
                    <div className="w-full">
                      <label htmlFor="">Maximum people</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter max people for this particular room"
                        id="maxPeople"
                        value={roomsListings.maxPeople}
                        onChange={addRoomsOnChange}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="">Room number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter room number"
                        id="number"
                        value={roomsListings.roomNumbers[0].number}
                        onChange={(e) => {
                          const newNumber = e.target.value;
                          setRoomsListings((prev) => {
                            const updatedRoomNumbers = prev.roomNumbers.map(
                              (room) => {
                                return { ...room, number: newNumber };
                              }
                            );
                            return {
                              ...prev,
                              roomNumbers: updatedRoomNumbers,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Brief description of the room</label>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Write a brief description of the room"
                      className="form-input"
                      value={roomsListings.description}
                      onChange={addRoomsOnChange}
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
                      onChange={addRoomsOnChange}
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

export default AddRooms;
