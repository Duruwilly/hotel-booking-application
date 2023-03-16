import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMessages: "",
  errorMessages: "",
};

const responseMessagesSlice = createSlice({
  name: "responseMessages",
  initialState,
  reducers: {
    addErrors(state, action) {
      state.errorMessages = action.payload;
    },
    addSuccessMessages(state, action) {
      state.successMessages = action.payload;
    },
  },
});

export const { addSuccessMessages, addErrors } = responseMessagesSlice.actions;
export default responseMessagesSlice.reducer;
