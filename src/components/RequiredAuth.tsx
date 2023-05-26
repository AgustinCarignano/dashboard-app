import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loginContext } from "../context/LoginContext";
import { API_URL, Methods, fetchAPI } from "../utils/fetchUtils";
import { toast } from "react-toastify";

function RequiredAuth(props: { children: React.ReactElement }) {
  const { loginState, dispatchLogin, loginActionTypes } =
    useContext(loginContext) || {};
  const { pathname } = useLocation();

  async function refreshToken() {
    const tokenData = localStorage.getItem("token");
    if (!tokenData) return;
    const { setAt } = JSON.parse(tokenData);
    const actualTime = new Date().getTime();
    if (actualTime - setAt > 3600000 * 6) {
      try {
        const token = await fetchAPI<string>(
          `${API_URL}/api/auth/refreshToken`,
          Methods.GET
        );
        localStorage.removeItem("token");
        localStorage.setItem(
          "token",
          JSON.stringify({ token, setAt: new Date().getTime() })
        );
      } catch (error: any) {
        if (error.message === "401" && dispatchLogin && loginActionTypes) {
          toast.error("Your session has expired. Please, login again");
          dispatchLogin({ type: loginActionTypes.LOGOUT });
        } else {
          return;
        }
      }
    }
  }

  useEffect(() => {
    refreshToken();
  }, [pathname]);

  if (!loginState?.auth) {
    return <Navigate to={"/dashboard-app/login"} />;
  }
  return props.children;
}

export default RequiredAuth;
