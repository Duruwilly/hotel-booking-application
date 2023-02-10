import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MediaQueryContext } from "./context/MediaQueryContext";
import { SearchContext } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MediaQueryContext>
      <SearchContext>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SearchContext>
    </MediaQueryContext>
  </React.StrictMode>
);
