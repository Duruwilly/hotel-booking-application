import searchStateReducer from "./searchStateSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

// export const store = configureStore({
//     reducer: {
//         searchState: searchStateReducer
//     }
// })


// import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    searchState: persistReducer(persistConfig, searchStateReducer),
    // cart: persistReducer(persistConfig, cartReducer),
    // save: persistReducer(persistConfig, savedReducer),
  })

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store)