import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
  totalAmount: 0,
  total: 0,
  totalQuantity: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.basketItems.find(
        (item) => item[0]._id === newItem[0]._id
      );
      if (!existingItem) {
        state.basketItems.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
      }
    },
    removeItem(state, action) {
      const itemId = action.payload;
      const basketItem = state.basketItems.find(
        (item) => item[0]._id === itemId
      );
      if (basketItem) {
        state.basketItems = state.basketItems.filter(
          (item) => item[0]._id !== itemId
        );
        state.totalQuantity--;
      }
    },
    clearBasket(state) {
      state.basketItems = [];
    },
  },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
