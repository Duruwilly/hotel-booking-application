import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQueriesContext } from "../context/MediaQueryContext";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetchHotelStatus, setFetchHotelStatus } = useMediaQueriesContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchHotelStatus("pending");
      try {
        const res = await axios.get(url);
        setFetchHotelStatus(res.status);
        setData(res.data.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    if (fetchHotelStatus === "idle") fetchData();
  }, [fetchHotelStatus]);

  return { loading, data, error };
};

export default useFetch;
