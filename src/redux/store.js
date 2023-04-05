import searchStateReducer from "./searchStateSlice";
import basketReducer from "./basketSlice";
import likedReducer from "./Favourites";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import bookingDataReducer from "./bookingData";

// export const store = configureStore({
//     reducer: {
//         searchState: searchStateReducer
//     }
// })

// import { combineReducers } from "redux";
// import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  searchState: persistReducer(persistConfig, searchStateReducer),
  basket: persistReducer(persistConfig, basketReducer),
  favourite: persistReducer(persistConfig, likedReducer),
  bookings: persistReducer(persistConfig, bookingDataReducer),
  // bookingData: persistReducer(persistConfig, bookingDataReducer),
  // save: persistReducer(persistConfig, savedReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
