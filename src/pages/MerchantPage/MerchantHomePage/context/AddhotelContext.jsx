import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { WILL_TRIP_BASE_URL } from "../../../../constants/base-urls";
import { useAuthContext } from "../../../../context/AuthContext";

const AddHotelContext = createContext();

export const AddHotelProvider = ({ children }) => {
  const [openAddModal, setAddModal] = useState(false);
  const [openAddRoomsModal, setOpenAddRoomsModal] = useState(false);
  const [editHotelModal, setEditHotelModal] = useState(false);
  const [editRoomModal, setEditRoomModal] = useState(false);
  const [editHotelState, setEditHotelState] = useState({});
  const [editRoomState, setEditRoomState] = useState({});
  const [getHotelId, setGetHotelId] = useState();

  const [fetchUserListing, setFetchUserListing] = useState({
    fetching: true,
    responseData: [],
  });

  const [roomsData, setRoomsData] = useState({
    fetching: true,
    responseData: [],
  });

  let { user } = useAuthContext();

  const [listingsData, setListingsData] = useState({
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

  const [roomsListings, setRoomsListings] = useState({
    title: "",
    description: "",
    price: 0,
    maxPeople: 0,
    roomNumbers: [{ number: 0 }],
    photos: [],
  });
  //   const { loading, setLoading } = useState(false);
  const toggleModal = () => {
    setAddModal(!openAddModal);
  };

  const addRoomsModal = () => {
    setOpenAddRoomsModal(!openAddRoomsModal);
  };

  const toggleEditHotelModal = () => {
    setEditHotelModal(!editHotelModal);
  };

  const toggleEditRoomModal = () => {
    setEditRoomModal(!editRoomModal);
  };

  const fetchListings = async () => {
    let url = `${WILL_TRIP_BASE_URL}/merchant/get-listings/${user?.id}`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (response?.data?.status === "success") {
      //   toast.success(response?.data?.msg);
      setFetchUserListing((state) => {
        return {
          ...state,
          fetching: false,
          responseData: response?.data?.data,
        };
      });
    } else {
      setFetchUserListing((state) => {
        return {
          ...state,
          fetching: false,
        };
      });
    }
  };

  const submitListings = async () => {
    let url = `${WILL_TRIP_BASE_URL}/hotels/merchant`;

    const formData = new FormData();
    formData.append("name", listingsData.name);
    formData.append("destination", listingsData.destination);
    formData.append("feature", listingsData.feature);
    formData.append("address", listingsData.address);
    formData.append("price", listingsData.price);
    formData.append("overview", listingsData.overview);
    formData.append("facilities", listingsData.facilities);
    formData.append("foods_and_drinks", listingsData.foods_and_drinks);
    formData.append("location", listingsData.location);

    for (let i = 0; i < listingsData.photos.length; i++) {
      formData.append("photos", listingsData.photos[i]);
    }
    formData.append("userID", user?.id);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.status === "success") {
        toast.success(response?.data?.msg);
        toggleModal();
        initializeState();
      } else {
        toggleModal();
      }
    } catch (error) {
      console.log(error);
      toggleModal();
    }
  };

  // const addRooms = async () => {
  //   let url = `${WILL_TRIP_BASE_URL}/rooms/${getHotelId}/merchant`;

  //   let response = await axios.post(
  //     url,
  //     {
  //       ...roomsListings,
  //       userID: user?.id,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   if (response?.data?.status === "success") {
  //     toast.success(response?.data?.msg);
  //     addRoomsModal();
  //     initializeState();
  //   } else {
  //     addRoomsModal();
  //   }
  // };

  const addRooms = async () => {
    const url = `${WILL_TRIP_BASE_URL}/rooms/${getHotelId}/merchant`;

    const formData = new FormData();
    formData.append("title", roomsListings.title);
    formData.append("price", roomsListings.price);
    formData.append("description", roomsListings.description);
    formData.append("maxPeople", roomsListings.maxPeople);
    for (let i = 0; i < roomsListings.roomNumbers.length; i++) {
      formData.append(
        `roomNumbers[${i}][number]`,
        roomsListings.roomNumbers[i].number
      );
    }

    for (let i = 0; i < roomsListings.photos.length; i++) {
      formData.append("photos", roomsListings.photos[i]);
    }
    formData.append("userID", user?.id);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.status === "success") {
        toast.success(response?.data?.msg);
        addRoomsModal();
        initializeState();
      } else {
        addRoomsModal();
      }
    } catch (error) {
      console.log(error);
      addRoomsModal();
    }
  };

  const fetchRoomsListings = async () => {
    let url = `${WILL_TRIP_BASE_URL}/merchant/get-rooms/${user?.id}`;
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (response?.data?.status === "success") {
      //   toast.success(response?.data?.msg);
      setRoomsData((state) => {
        return {
          ...state,
          fetching: false,
          responseData: response?.data?.data,
        };
      });
    } else {
      setRoomsData((state) => {
        return {
          ...state,
          fetching: false,
        };
      });
    }
  };

  const deleteHotel = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/hotels/merchant/${id}`;
    if (window.confirm("Are you sure you want to proceed?")) {
      try {
        let response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (response.data.status === "success") {
          initializeState();
          toast.success(response?.data?.msg);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const addHotelOnChange = (e) => {
    if (e.target.files) {
      setListingsData((prev) => ({
        ...prev,
        photos: e.target.files,
      }));
    }

    if (!e.target.files) {
      setListingsData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const addRoomsOnChange = (e) => {
    if (e.target.files) {
      setRoomsListings((prev) => ({
        ...prev,
        photos: e.target.files,
      }));
    }

    if (!e.target.files) {
      setRoomsListings((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  let initializeState = () => {
    fetchListings();
    clearState();
    fetchRoomsListings();
  };

  let clearState = () => {
    setFetchUserListing((state) => {
      return {
        ...state,
        fetching: true,
        responseData: [],
      };
    });
    setListingsData((state) => {
      return {
        ...state,
        name: "",
        destination: "",
        feature: "",
        address: "",
        photos: [],
        price: "",
        overview: "",
        facilities: "",
        foods_and_drinks: "",
        location: "",
      };
    });
    setRoomsListings((state) => {
      return {
        ...state,
        title: "",
        description: "",
        price: 0,
        maxPeople: 0,
        roomNumbers: [{ number: 0 }],
      };
    });
  };
  return (
    <AddHotelContext.Provider
      value={{
        toggleModal,
        openAddModal,
        initializeState,
        clearState,
        submitListings,
        fetchUserListing,
        user,
        listingsData,
        addHotelOnChange,
        deleteHotel,
        addRoomsModal,
        openAddRoomsModal,
        getHotelId,
        setGetHotelId,
        addRooms,
        roomsData,
        roomsListings,
        setRoomsListings,
        addRoomsOnChange,
        toggleEditHotelModal,
        editHotelModal,
        setListingsData,
        editRoomModal,
        toggleEditRoomModal,
        setEditHotelState,
        editHotelState,
        setEditRoomState,
        editRoomState,
      }}
    >
      {children}
    </AddHotelContext.Provider>
  );
};

export const useAddHotelContext = () => useContext(AddHotelContext);
