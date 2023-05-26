import { createContext, useEffect, useReducer } from "react";
import { LoginActions, LoginContextType, LoginState } from "../@types/login";

const reducer = (state: LoginState, action: LoginActions): LoginState => {
  switch (action.type) {
    case loginActionTypes.LOGIN:
      if (action.payload) return { auth: true, ...action.payload };
      else return { ...state };
    case loginActionTypes.LOGOUT:
      localStorage.removeItem("token");
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

const setLocalStorage = (state: LoginState) => {
  localStorage.setItem("login", JSON.stringify(state));
};

const getLocalStorage = (): LoginState => {
  return JSON.parse(localStorage.getItem("login") || "");
};

export const loginContext = createContext<LoginContextType | null>(null);

export default function LoginContextProvider(props: {
  children: React.ReactNode;
}) {
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
      {props.children}
    </loginContext.Provider>
  );
}
