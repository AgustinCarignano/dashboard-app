import fetch from "cross-fetch";
import { IFetchData } from "../@types/fetchTypes";
import { UserType } from "../@types/users";

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
  try {
    const resp = await fetch(URL, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data: IFetchData<T> = await resp.json();
      return { error: null, data: data.payload };
    } else {
      return {
        error: { status: resp.status, message: resp.statusText },
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
}
