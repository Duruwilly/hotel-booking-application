import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQueriesContext } from "../context/MediaQueryContext";
import { useSelector } from "react-redux";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchHotelStatus, setFetchHotelStatus } = useMediaQueriesContext();
  // let { destination } = useSelector((state) => state.searchState);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchHotelStatus("pending");
      try {
        const res = await axios.get(url);
        setFetchHotelStatus(res.data.status);
        setData(res.data.data);
      } catch (error) {
        setError(error);
      }
      // setTimeout(() => {
      // }, 1000);
      setLoading(false);
    };
    if (fetchHotelStatus === "idle") fetchData();
  }, [fetchHotelStatus]);

  // const fetchHotels = async () => {
  //   // setLoading(true);
  //   setFetchHotelStatus("pending");
  //   const url = `http://localhost:8800/api/v1/hotels?country=${destination}`;
  //   try {
  //     const res = await axios.get(url);
  //     setFetchHotelStatus(res.data.status);
  //     if (res.data.status === "success") {
  //       // setTimeout(() => {
  //       // }, 1000);
  //       setLoading(false);
  //     }
  //     setData(res.data.data);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   if (fetchHotelStatus === "idle") fetchHotels();
  // }, [fetchHotelStatus]);

  return { data, error, loading };
};

export default useFetch;
