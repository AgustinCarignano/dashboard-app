import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loginContext } from "../context/LoginContext";
import { API_URL, Methods, fetchAPI } from "../utils/fetchUtils";

function RequiredAuth(props: { children: React.ReactElement }) {
  const { loginState, dispatchLogin, loginActionTypes } =
    useContext(loginContext) || {};
  const { pathname } = useLocation();

  async function refreshToken() {
    try {
      const { error, data } = await fetchAPI<string>(
        `${API_URL}/api/auth/refreshToken`,
        Methods.GET
      );
      if (data) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data);
        return;
      } else {
        if (error?.status === 401 && dispatchLogin && loginActionTypes) {
          localStorage.removeItem("token");
          dispatchLogin({ type: loginActionTypes.LOGOUT });
        }
      }
    } catch (error) {
      return;
    }
  }

  // useEffect(() => {
  //   refreshToken();
  // }, [pathname]);

  if (!loginState?.auth) {
    return <Navigate to={"/dashboard-app/login"} />;
  }
  return props.children;
}

export default RequiredAuth;
