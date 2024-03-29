import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketItemsContext";
import { useFavouriteContext } from "./FavouriteItemsContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userProfileDetails, setUserProfileDetails] = useState();
  const { user } = useAuthContext();
  const [loadingState, setLoadingState] = useState(false);
  const [fetchingState, setFetchingState] = useState("idle");
  const { getCartItems } = useBasketContext();
  const { getFavouriteItems } = useFavouriteContext();

  const getUserDetails = async () => {
    setLoadingState(true);
    setFetchingState("pending");
    try {
      const res = await axios.get(`${WILL_TRIP_BASE_URL}/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res?.data?.status === "success") {
        setLoadingState(false);
        setUserProfileDetails(res?.data?.data);
      }
      // getCartItems(user);
      // getFavouriteItems(user);
      //   toast.success(res.data.msg);
    } catch (error) {
      setLoadingState(false);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (fetchingState === "idle") getUserDetails();
  }, [fetchingState]);

  return (
    <UserContext.Provider
      value={{
        getUserDetails,
        userProfileDetails,
        loadingState,
        fetchingState,
        setFetchingState,
        setUserProfileDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfileContext = () => useContext(UserContext);
