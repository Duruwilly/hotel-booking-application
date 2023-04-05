import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingsData: {},
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBookingData(state, action) {
      state.bookingsData = action.payload;
    },
  },
});

export const { addBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;
