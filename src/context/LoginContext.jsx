import { createContext, useEffect, useReducer } from "react";

export const loginContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN:
      return { auth: true, ...action.payload };
    case loginActionTypes.LOGOUT:
      return { ...initialState };
    case loginActionTypes.UPDATE:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

const loginActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE: "UPDATE",
};

const initialState = {
  auth: false,
  fullName: "",
  email: "",
  photo: "",
};

const setLocalStorage = (state) => {
  localStorage.setItem("login", JSON.stringify(state));
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("login"));
};

export default function LoginContextProvider({ children }) {
  const [loginState, dispatchLogin] = useReducer(
    reducer,
    getLocalStorage() || initialState
  );

  useEffect(() => {
    setLocalStorage(loginState);
  }, [loginState]);

  return (
    <loginContext.Provider
      value={{ loginState, dispatchLogin, loginActionTypes }}
    >
      {children}
    </loginContext.Provider>
  );
}
