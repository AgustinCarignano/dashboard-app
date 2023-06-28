import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginContext } from "../context/LoginContext";

function RequiredAuth(props) {
  const { loginState } = useContext(loginContext);

  if (!loginState.auth) {
    return <Navigate to={"/login"} />;
  }
  return props.children;
}

export default RequiredAuth;
