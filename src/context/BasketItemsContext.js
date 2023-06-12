import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { user } = useAuthContext();
  const [error, setErrors] = useState(false);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [datesCheck, setDatesCheck] = useState([]);
  const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef(null);

  const total = basketItems?.reduce((acc, item) => {
    return acc + item.quantity * item.price * item.days;
  }, 0);

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

  const clearAllCartItems = async (user) => {
    let url = `${WILL_TRIP_BASE_URL}/cart/delete-all-items/${user?.id}`;
    try {
      let response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.data.status === "success") {
        setFetchStatus("idle");
        getCartItems(user);
        toast.success(response?.data?.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("15:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 900);
    return deadline;
  };

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
        setDatesCheck,
        datesCheck,
        timer,
        getDeadTime,
        clearTimer,
        clearAllCartItems,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);
