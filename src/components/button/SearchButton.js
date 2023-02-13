import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";
import { useSharedSearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const Button = () => {
  const { dispatch } = useSharedSearchContext()
  const { reFetch } = useFetch()
  const navigate = useNavigate();
  let { roomOptions, destination, date } = useSelector(
    (state) => state.searchState
  );

  let url = ""
  if(destination !== "") {
    url = `/destinations/${destination}/hotels`
  } else {
    url = '/destinations/hotels'
  }
  const handleSearch = () => {
    // dispatch({ type: "NEW_SEARCH", payload: { destination, date, roomOptions }})
    // navigate(url, { state: { destination, date, roomOptions } });
    navigate(url)
    // setTimeout(() => {
    //   setLoading(false)
    // },1200)
  };

  return (
    <button onClick={handleSearch} className="bg-red-900 py-4 px-9 uppercase text-white text-xs font-semibold rounded-[3px] cursor-pointer">
      search
    </button>
  );
};

export default Button;
