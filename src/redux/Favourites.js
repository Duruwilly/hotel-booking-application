import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteItems: [],
  likedBtnnColor: "",
  totalFavQuantity: 0
};

const addAndRemoveSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.favouriteItems.find((item) => item._id === newItem._id)
      if (!existingItem) {
        state.favouriteItems.push({
          ...newItem,
        });
        state.totalFavQuantity++;
      }
    },
    setLikedBtnColor(state, action){
        state.likedBtnnColor = action.payload
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.favouriteItems.find(
        (item) => item._id === itemId
      );
      if (existingItem) {
        state.favouriteItems = state.favouriteItems.filter(
          (item) => item._id !== itemId
        );
        state.totalFavQuantity--;
      }
    },
  },
});

export const { addItem, removeItem, setLikedBtnColor } = addAndRemoveSlice.actions;
export default addAndRemoveSlice.reducer;
