import { useSelector } from "react-redux";

const useLikedItemCheck = () => {
  let { wishlistsItems } = useSelector((state) => state.favourite);
  const likedItemCheck = () => {
    const idArr = [];
    for (let i = 0; i < wishlistsItems.length; i++) {
      idArr.push(wishlistsItems[i]._id);
    }
    return idArr;
  };

  return { likedItemCheck };
};

export default useLikedItemCheck;
