import fetch from "cross-fetch";
import { IFetchData } from "../@types/fetchTypes";
import { UserType } from "../@types/users";
import { toast } from "react-toastify";

export const API_URL = process.env.REACT_APP_API_URL;

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export async function loginFecth(credentials: {
  email: string;
  password: string;
}) {
  const resp = await fetchAPI<{ token: string; user: Partial<UserType> }>(
    `${API_URL}/api/auth/login`,
    Methods.POST,
    credentials
  );
  return resp;
}

export async function fetchAPI<T>(
  URL: string,
  method: Methods,
  body?: Partial<T> | { email: string; password: string }
) {
  const tokenData = localStorage.getItem("token");
  const token = tokenData ? JSON.parse(tokenData).token : undefined;
  try {
    const resp = await fetch(URL, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    if (resp.ok) {
      const data: IFetchData<T> = await resp.json();
      return data.payload;
    } else {
      if (resp.status === 401) {
        const newError = new Error("401");
        newError.name = "Unauthorized";
        throw newError;
      } else {
        throw new Error("Server error");
      }
    }
  } catch (e: any) {
    if (e.message !== "401")
      toast.error("There has been a problem. Please, try again.");
    throw e;
  }
}
