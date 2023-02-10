import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  destination: undefined,
  date: [],
  roomOptions: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

const SharedSearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContext = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SharedSearchContext.Provider
      value={{
        destination: state.destination,
        date: state.date,
        roomOptions: state.roomOptions,
        dispatch
      }}
    >
      {children}
    </SharedSearchContext.Provider>
  );
};

export const useSharedSearchContext = () => useContext(SharedSearchContext);
