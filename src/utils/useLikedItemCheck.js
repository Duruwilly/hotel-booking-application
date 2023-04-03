import axios from "axios";
import { useSelector } from "react-redux";
import { WILL_TRIP_BASE_URL } from "../constants/base-urls";
import { useFavouriteContext } from "../context/FavouriteItemsContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLikedItemCheck = () => {
  const { favouriteItems } = useFavouriteContext();
  const navigate = useNavigate();
  // let { wishlistsItems } = useSelector((state) => state.favourite);
  const likedItemCheck = () => {
    const idArr = [];
    for (let i = 0; i < favouriteItems.length; i++) {
      idArr.push(favouriteItems[i].itemId);
    }
    return idArr;
  };

  const addToFavourites = async (
    user,
    id,
    price,
    _id,
    feature,
    destination,
    name,
    photos
  ) => {
    if (user) {
      try {
        const response = await axios.post(`${WILL_TRIP_BASE_URL}/favourites`, {
          price,
          itemId: _id,
          feature,
          destination,
          name,
          photos,
          userID: user.id,
          quantity: 1,
        });
        return response;
      } catch (error) {
        return false;
      }
    } else {
      navigate("/login");
    }
  };

  const deleteFromFavourites = async (user, itemId) => {
    try {
      const response = await axios.delete(
        `${WILL_TRIP_BASE_URL}/favourites/${user?.id}/delete-favourite/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.data.status === "success") {
        return response;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return false;
    }
  };

  return { likedItemCheck, addToFavourites, deleteFromFavourites };
};

export default useLikedItemCheck;
