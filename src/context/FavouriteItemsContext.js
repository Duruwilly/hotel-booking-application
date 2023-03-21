import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "./AuthContext";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { user } = useAuthContext();
  const [error, setErrors] = useState(false);
  const [favouriteFetchStatus, setFavouriteFetchStatus] = useState("idle");

  const getFavouriteItems = async (user) => {
    setLoading(true);
    setFavouriteFetchStatus("pending");
    let url = `${WILL_TRIP_BASE_URL}/favourites/${user?.id}`;
    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response?.data?.status === "success") {
        setLoading(false);
        setFavouriteFetchStatus(response.data.status);
        setFavouriteItems(response?.data?.data);
      }
    } catch (error) {
      setErrors(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (favouriteFetchStatus === "idle") getFavouriteItems();
  }, [favouriteFetchStatus]);

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, favouriteFetchStatus, loading, setFavouriteFetchStatus, setFavouriteItems, getFavouriteItems }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavouriteContext = () => useContext(FavouriteContext);
