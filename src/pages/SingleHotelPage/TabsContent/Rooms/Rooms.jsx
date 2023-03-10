import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Room from "./Room";
import { useAuthContext } from "../../../../context/AuthContext";
import PriceConversion from "../../../../components/PriceConversion/PriceConversion";
import useDaysCalculate from "../../../../hooks/useDaysCalculate";
import { addItem } from "../../../../redux/basketSlice";

const Rooms = ({ hotelID, hotelName, hotelCountry, feature }) => {
  const { user } = useAuthContext();
  let { days } = useDaysCalculate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { roomOptions, dateSearch } = useSelector((state) => state.searchState);

  useEffect(() => {
    fetchRoom();
  }, [hotelID]);

  // fetches rooms
  const fetchRoom = async () => {
    try {
      let url = `http://localhost:8800/api/v1/hotels/room/${hotelID}`;
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (error) {
      setError(error);
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
                // hotelState={hotelState}
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
