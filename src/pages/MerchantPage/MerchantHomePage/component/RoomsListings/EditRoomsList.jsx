import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../../../../components/Modal/Modal";
import { WILL_TRIP_BASE_URL } from "../../../../../constants/base-urls";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useAddHotelContext } from "../../context/AddhotelContext";

const EditRoomsList = () => {
  const { user } = useAuthContext();
  const { initializeState, editRoomModal, editRoomState, toggleEditRoomModal } =
    useAddHotelContext();

  const [editRoomList, setEditRoomList] = useState({
    title: "",
    description: "",
    price: 0,
    maxPeople: 0,
    roomNumbers: [{ number: 0 }],
    photos: [],
  });

  useEffect(() => {
    setEditRoomList({
      title: editRoomState?.title || "",
      description: editRoomState?.description || "",
      price: editRoomState?.price || 0,
      maxPeople: editRoomState.maxPeople || 0,
      roomNumbers: editRoomState?.roomNumbers || [{ number: 0 }],
      photos: editRoomState?.photos || [],
    });
  }, [editRoomState]);

  const submitEditRoomListing = async () => {
    let url = `${WILL_TRIP_BASE_URL}/rooms/merchant/${editRoomState._id}`;

    const formData = new FormData();
    formData.append("title", editRoomList.title);
    formData.append("price", editRoomList.price);
    formData.append("description", editRoomList.description);
    formData.append("maxPeople", editRoomList.maxPeople);
    for (let i = 0; i < editRoomList.roomNumbers.length; i++) {
      formData.append(
        `roomNumbers[${i}][number]`,
        editRoomList.roomNumbers[i].number
      );
    }

    for (let i = 0; i < editRoomList.photos.length; i++) {
      formData.append("photos", editRoomList.photos[i]);
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
        toggleEditRoomModal();
      }
    } catch (error) {
      toast.error(error?.data?.response.message);
    }
  };

  const roomsOnChange = (e) => {
    if (e.target.files) {
      setEditRoomList((prev) => ({
        ...prev,
        photos: e.target.files,
      }));
    }

    if (!e.target.files) {
      setEditRoomList((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  // const roomsOnChange = (e) => {
  //   setEditRoomList((prev) => ({
  //     ...prev,
  //     [e.target.id]: e.target.value,
  //   }));
  // };

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
                        value={editRoomList.title}
                        onChange={roomsOnChange}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="">Price per night</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter price for this particular room"
                        id="price"
                        value={editRoomList.price}
                        onChange={roomsOnChange}
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
                        value={editRoomList.maxPeople}
                        onChange={roomsOnChange}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="">Room number</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Enter room number"
                        id="number"
                        value={editRoomList.roomNumbers[0].number}
                        onChange={(e) => {
                          const newNumber = e.target.value;
                          setEditRoomList((prev) => {
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
                      value={editRoomList.description}
                      onChange={roomsOnChange}
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
                      onChange={roomsOnChange}
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

export default EditRoomsList;
