import React from "react";
import { Navigate } from "react-router-dom";

function RequiredAuth(props) {
  if (!props.auth) {
    return <Navigate to={"/login"} />;
  }
  return props.children;
}

export default RequiredAuth;
