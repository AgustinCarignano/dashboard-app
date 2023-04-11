import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loginContext } from "../context/LoginContext";

function RequiredAuth(props) {
  const { state } = useContext(loginContext);

  if (!state.auth) {
    return <Navigate to={"/dashboard-app/login"} />;
  }
  return props.children;
}

export default RequiredAuth;
