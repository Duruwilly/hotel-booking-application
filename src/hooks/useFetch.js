import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQueriesContext } from "../context/MediaQueryContext";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {fetchHotelStatus, setFetchHotelStatus} = useMediaQueriesContext()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchHotelStatus('pending')
      try {
        const res = await axios.get(url);
        setFetchHotelStatus(res.status)
        setData(res.data.data);
        // console.log(res.data.data);
      } catch (error) {
        setError(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    // console.log(data.status);
    if(fetchHotelStatus === "idle") fetchData();
  }, [fetchHotelStatus]);

  // const reFetch = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(url);
  //     setData(res.data.data);
  //   } catch (error) {
  //     setError(error);
  //   }
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // };

  return { loading, data, error };
};

export default useFetch;
