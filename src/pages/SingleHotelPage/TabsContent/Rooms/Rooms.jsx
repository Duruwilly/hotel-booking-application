import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Room from "./Room";
import { useAuthContext } from "../../../../context/AuthContext";
import PriceConversion from "../../../../components/PriceConversion/PriceConversion";
import useDaysCalculate from "../../../../hooks/useDaysCalculate";
import { WILL_TRIP_BASE_URL } from "../../../../constants/base-urls";
import { toast } from "react-toastify";
import { useBasketContext } from "../../../../context/BasketItemsContext";
import SearchButtonSpinner from "../../../../components/Spinner/SearchButtonSpinner";

const Rooms = ({ hotelID, hotelName, hotelCountry, feature, hotelAddress }) => {
  const { user } = useAuthContext();
  let { days } = useDaysCalculate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { roomOptions, dateSearch } = useSelector((state) => state.searchState);
  const { setFetchStatus, getCartItems } = useBasketContext();
  // fetches rooms
  useEffect(() => {
    const controller = new AbortController();
    const fetchRoom = async () => {
      try {
        let url = `${WILL_TRIP_BASE_URL}/hotels/room/${hotelID}`;
        const res = await axios.get(url);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchRoom();
    return () => {
      controller.abort();
    };
  }, [hotelID]);

  const addToBasket = async (id) => {
    const item = data.filter((itemId) => itemId._id === id)[0];
    const { price, maxPeople, roomNumbers, title, _id } = item;
    const url = `${WILL_TRIP_BASE_URL}/cart`;
    if (user) {
      try {
        const response = await axios.post(url, {
          price,
          maxPeople,
          roomNumbers,
          title,
          roomOptions,
          dateSearch,
          days,
          hotelCountry,
          hotelName,
          hotelAddress,
          feature,
          quantity: 1,
          itemId: _id,
          userID: user.id,
          hotelID,
        });
        setFetchStatus("idle");
        getCartItems(user);
        navigate("/confirmation");
        toast.error(response.data.msg);
      } catch (error) {
        toast.error(error);
      }
    } else {
      // Redirect to login page with return_url parameter
      const returnURL = `/hotel/${hotelName}/${hotelCountry}/${hotelID}`;
      const loginURL = `/login?return_url=${returnURL}`;
      window.location.href = loginURL;
      // navigate("/login");
    }
  };

  if (loading || data.length === 0) return <SearchButtonSpinner />;
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg px-4">
          <PriceConversion />
          {data.map((room) => (
            <div key={room._id} className="mt-3">
              <Room
                room={room}
                hotelName={hotelName}
                hotelCountry={hotelCountry}
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
