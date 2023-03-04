import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const HotelData = createContext();

export const HotelDataContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fetchHotelStatus, setFetchHotelStatus] = useState("idle");
  let { destination } = useSelector((state) => state.searchState);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     setFetchHotelStatus("pending");
  //     const url = `http://localhost:8800/api/v1/hotels?country=`;
  //     try {
  //       const res = await axios.get(url);
  //       setFetchHotelStatus(res.status);
  //       setData(res.data.data);
  //       // console.log(res.data.data);
  //     } catch (error) {
  //       setError(error);
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   };
  //   // console.log(data.status);
  //   if (fetchHotelStatus === "idle") fetchData();
  // }, [fetchHotelStatus]);

  return (
    <HotelData.Provider value={{ data, loading, error, fetchHotelStatus }}>
      {children}
    </HotelData.Provider>
  );
};

export const useHotelDataContext = () => useContext(HotelData);
