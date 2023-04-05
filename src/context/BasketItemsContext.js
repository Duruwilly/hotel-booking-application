import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { user } = useAuthContext();
  const [error, setErrors] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");

  const total = basketItems?.reduce((acc, item) => {
    return acc + item.quantity * item.price * item.days;
  }, 0);
  // console.log(user);

  const getCartItems = async (user) => {
    setLoading(true);
    setFetchStatus("pending");
    let url = `${WILL_TRIP_BASE_URL}/cart/get-cart-items/${user?.id}`;
    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response?.data?.status === "success") {
        setLoading(false);
        setFetchStatus(response?.data?.status);
        setBasketItems(response?.data?.data);
      }
    } catch (error) {
      setErrors(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (fetchStatus === "idle") getCartItems();
  }, [fetchStatus]);

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        total,
        fetchStatus,
        loading,
        setFetchStatus,
        setBasketItems,
        getCartItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);
