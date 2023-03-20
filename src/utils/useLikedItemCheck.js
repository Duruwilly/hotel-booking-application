import { useSelector } from "react-redux";
import { useFavouriteContext } from "../context/FavouriteItemsContext";

const useLikedItemCheck = () => {
  const { favouriteItems } = useFavouriteContext();
  // let { wishlistsItems } = useSelector((state) => state.favourite);
  const likedItemCheck = () => {
    const idArr = [];
    for (let i = 0; i < favouriteItems.length; i++) {
      idArr.push(favouriteItems[i]._id);
    }
    return idArr;
  };

  return { likedItemCheck };
};

export default useLikedItemCheck;
