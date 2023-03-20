import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MediaQueryContext } from "./context/MediaQueryContext";
import { SearchContext } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { HotelDataContext } from "./context/HotelDataContext";
import { RegisterAuthContextProvider } from "./context/RegisterAuthContext";
import { FavouriteProvider } from "./context/FavouriteItemsContext";
// import { UserContextProvider } from "./context/userProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MediaQueryContext>
      <FavouriteProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </AuthContextProvider>
      </FavouriteProvider>
    </MediaQueryContext>
  </React.StrictMode>
);
