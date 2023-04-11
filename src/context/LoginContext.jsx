import { createContext, useEffect, useReducer } from "react";

export const loginContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { auth: true, ...action.payload };
    case "logout":
      return { ...initialState };
    case "updateUser":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
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
  const [state, dispatch] = useReducer(
    reducer,
    getLocalStorage() || initialState
  );

  useEffect(() => {
    setLocalStorage(state);
  }, [state]);

  return (
    <loginContext.Provider value={{ state, dispatch }}>
      {children}
    </loginContext.Provider>
  );
}
