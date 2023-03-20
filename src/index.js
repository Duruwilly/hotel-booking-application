import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MediaQueryContext } from "./context/MediaQueryContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { FavouriteProvider } from "./context/FavouriteItemsContext";
import { BasketProvider } from "./context/BasketItemsContext";
import { UserContextProvider } from "./context/UserProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MediaQueryContext>
      <FavouriteProvider>
        <BasketProvider>
          <AuthContextProvider>
            <UserContextProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <App />
                </PersistGate>
              </Provider>
            </UserContextProvider>
          </AuthContextProvider>
        </BasketProvider>
      </FavouriteProvider>
    </MediaQueryContext>
  </React.StrictMode>
);
