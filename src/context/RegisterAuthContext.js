import { createContext, useContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  // if the a user exist in the local storage, we get it and use it else null
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const RegisterAuthContext = createContext(INITIAL_STATE);

const RegisterAuthReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RegisterAuthReducer, INITIAL_STATE);

  // save the user to the local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <RegisterAuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RegisterAuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(RegisterAuthContext);
