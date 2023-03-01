import { useSelector } from "react-redux";

const useLikedItemCheck = () => {
  let { favouriteItems } = useSelector((state) => state.favourite);
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
