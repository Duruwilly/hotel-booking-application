import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { WILL_TRIP_BASE_URL } from "../../../../constants/base-urls";
import { useAuthContext } from "../../../../context/AuthContext";

const AddHotelContext = createContext();

export const AddHotelProvider = ({ children }) => {
  const [openAddModal, setAddModal] = useState(false);
  const [openAddRoomsModal, setOpenAddRoomsModal] = useState(false);
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
    photos: "",
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
  });
  //   const { loading, setLoading } = useState(false);
  const toggleModal = () => {
    setAddModal(!openAddModal);
  };

  const addRoomsModal = () => {
    setOpenAddRoomsModal(!openAddRoomsModal);
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

    let response = await axios.post(
      url,
      {
        ...listingsData,
        userID: user?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (response?.data?.status === "success") {
      toast.success(response?.data?.msg);
      toggleModal();
      initializeState();
    } else {
      toggleModal();
    }
  };

  const addRooms = async () => {
    let url = `${WILL_TRIP_BASE_URL}/rooms/${getHotelId}/merchant`;

    let response = await axios.post(
      url,
      {
        ...roomsListings,
        userID: user?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (response?.data?.status === "success") {
      toast.success(response?.data?.msg);
      addRoomsModal();
      initializeState();
    } else {
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
  };

  const deleteRoom = async (id) => {
    let url = `${WILL_TRIP_BASE_URL}/rooms/${id}/merchant`;
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
    setRoomsListings((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
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
      return { ...state, listingsData: "" };
    });
  };
  // console.log([roomsListings.roomNumbers[0].number = 5]);
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
      }}
    >
      {children}
    </AddHotelContext.Provider>
  );
};

export const useAddHotelContext = () => useContext(AddHotelContext);
