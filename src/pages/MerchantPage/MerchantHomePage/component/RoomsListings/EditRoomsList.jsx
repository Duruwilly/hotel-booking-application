import axios from "axios";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../../../../components/Modal/Modal";
import { WILL_TRIP_BASE_URL } from "../../../../../constants/base-urls";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useAddHotelContext } from "../../context/AddhotelContext";

const EditRoomsList = () => {
  const { user } = useAuthContext();
  const {
    initializeState,
    editRoomModal,
    setRoomsListings,
    roomsListings,
    editRoomState,
    toggleEditRoomModal,
    addRoomsOnChange,
  } = useAddHotelContext();

  useEffect(() => {
    setRoomsListings({
      title: editRoomState?.title || "",
      description: editRoomState?.description || "",
      price: editRoomState?.price || 0,
      maxPeople: editRoomState.maxPeople || 0,
      roomNumbers: editRoomState.roomNumbers || [{ number: 0 }],
    });
  }, [editRoomState]);

  const submitEditRoomListing = async () => {
    let url = `${WILL_TRIP_BASE_URL}/rooms/merchant/${editRoomState._id}`;
    try {
      let res = await axios.put(
        url,
        { ...roomsListings },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (res.data.status === "success") {
        toast.success(res?.data?.msg);
        initializeState();
        toggleEditRoomModal();
      }
    } catch (error) {
      toast.error(error?.data?.response.message);
    }
  };

  return (
    <>
      {editRoomModal && (
        <Modal>
          <div className="flex justify-center items-center">
            <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 relative shadow-md overflow-y-auto">
              <FaTimes
                onClick={() => toggleEditRoomModal()}
                className="text-whit absolute top-4 right-4 text-2xl cursor-pointer"
              />
              <form
                className="py-14 px-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitEditRoomListing();
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

export default EditRoomsList;
