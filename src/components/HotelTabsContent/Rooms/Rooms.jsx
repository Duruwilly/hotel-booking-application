import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/basketSlice";
import { useAuthContext } from "../../../context/AuthContext";
import useDaysCalculate from "../../../hooks/useDaysCalculate";
import axios from "axios";
import PriceConversion from "../../PriceConversion/PriceConversion";
import Room from "./Room";

const Rooms = ({ hotelID, hotelName, hotelCountry, hotelState, feature }) => {
  const { user } = useAuthContext();
  let { days } = useDaysCalculate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { roomOptions, dateSearch } = useSelector((state) => state.searchState);

  useEffect(() => {
    fetchRoom();
  }, [hotelID]);

  const fetchRoom = async () => {
    try {
      let url = `http://localhost:8800/api/v1/hotels/room/${hotelID}`;
      const res = await axios.get(url);
      // console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // let url = `http://localhost:8800/api/v1/hotels/room/${hotelID}`;

  //   const { data, loading, error } = useFetch(url);
  //   console.log(data, "at here too");

  //   useEffect(() => {
  //     setFetchHotelStatus("idle");
  //   }, [hotelID]);

  const addToBasket = (id) => {
    const item = data.filter((itemId) => itemId._id === id);
    if (user) {
      dispatch(
        addItem({
          ...item,
          roomOptions,
          dateSearch,
          days,
          hotelName,
          hotelCountry,
          hotelState,
          feature,
        })
      );
      navigate("/basket");
    } else {
      navigate("/login ");
      return;
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg mt-">
          <PriceConversion />
          {data.map((room) => (
            <div key={room._id} className="mt-3">
              <Room
                room={room}
                hotelName={hotelName}
                hotelCountry={hotelCountry}
                hotelState={hotelState}
                feature={feature}
                addToBasket={addToBasket}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
