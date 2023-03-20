import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Room from "./Room";
import { useAuthContext } from "../../../../context/AuthContext";
import PriceConversion from "../../../../components/PriceConversion/PriceConversion";
import useDaysCalculate from "../../../../hooks/useDaysCalculate";
import { addItem } from "../../../../redux/basketSlice";
import { WILL_TRIP_BASE_URL } from "../../../../constants/base-urls";
import { toast } from "react-toastify";

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

  const addToBasket = async (id) => {
    const item = data.filter((itemId) => itemId._id === id)[0];
    const { price, maxPeople, roomNumbers, title } = item;
    console.log(price);
    const url = `${WILL_TRIP_BASE_URL}/cart`;
    if (user) {
      try {
        await axios.post(url, {
          price,
          maxPeople,
          roomNumbers,
          title,
          roomOptions,
          dateSearch,
          days,
          hotelCountry,
          hotelName,
          feature,
          quantity: 1,
          userID: user.id,
        });
      } catch (error) {
        toast.error(error);
      }
      // navigate("/basket");
    } else {
      navigate("/login");
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
