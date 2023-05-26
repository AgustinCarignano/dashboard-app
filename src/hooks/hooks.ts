import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { useContext } from "react";
import { loginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useFetchWrapp(action: any) {
  const dispatch = useAppDispatch();
  const { dispatchLogin, loginActionTypes } = useContext(loginContext) || {};

  const callbackFunction = async () => {
    try {
      await dispatch(action()).unwrap();
    } catch (error: any) {
      if (error.message === "401" && dispatchLogin && loginActionTypes) {
        toast.error("Your session has expired. Please, login again");
        dispatchLogin({ type: loginActionTypes.LOGOUT });
      }
    }
  };
  return callbackFunction;
}
