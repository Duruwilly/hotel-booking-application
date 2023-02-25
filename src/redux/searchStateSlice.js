import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: "",
  dateSearch: [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ],
  roomOptions: {
    adult: 1,
    children: 0,
  },
  searchQueryDates: [
    {
      searchQueryStartDates: undefined,
      searchQueryEndDates: undefined,
    },
  ],
};

const searchStateSlice = createSlice({
  name: "searchState",
  initialState,
  reducers: {
    handleRoomOption(state, action) {
      const { name, operation } = action.payload;
      state.roomOptions = {
        ...state.roomOptions,
        [name]:
          operation === "i"
            ? state.roomOptions[name] + 1
            : state.roomOptions[name] - 1,
      };
    },
    setDate(state, action) {
      const { startDate, endDate, key } = action.payload;
      state.dateSearch = [
        {
          startDate,
          endDate,
          key,
        },
      ];
    },
    setSearchQueryDates(state, action) {
      const { searchQueryStartDates, searchQueryEndDates } = action.payload;
      state.searchQueryDates = [
        {
          searchQueryStartDates,
          searchQueryEndDates,
        },
      ];
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
  },
});

export const { handleRoomOption, setDate, setDestination, setSearchQueryDates } =
  searchStateSlice.actions;
export default searchStateSlice.reducer;
