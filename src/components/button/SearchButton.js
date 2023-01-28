import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";

const Button = () => {
  const { destination, date, roomOptions, setError, setLoading } = useMediaQueriesContext();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/destinations/abc", { state: { destination, date, roomOptions } });
    setTimeout(() => {
      setLoading(false)
    },1200)
  };

  return (
    <button onClick={handleSearch} className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-semibold rounded-[3px]">
      search
    </button>
  );
};

export default Button;
