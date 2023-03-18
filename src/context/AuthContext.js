import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const INITIAL_STATE = {
  // if the a user exist in the local storage, we get it and use it else null
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "FAILED":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // save the user to the local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
