import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IUserState, UserType, UserUpdateObj } from "../../@types/users";
import { IGlobalStore } from "../../@types/store";
import { Methods, fetchAPI, API_URL } from "../../utils/fetchUtils";
import { toast } from "react-toastify";

const baseURL = `${API_URL}/api/users`;

const initialState: IUserState = {
  users: [],
  user: {} as UserType,
  isLoading: true,
  hasError: false,
};

export const getUsersData = createAsyncThunk("users/getAllUsers", async () => {
  const data = await fetchAPI<UserType[]>(baseURL, Methods.GET);
  return { data };
});

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id: string) => {
    const data = await fetchAPI<UserType>(`${baseURL}/${id}`, Methods.GET);
    return { data, id };
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (body: Partial<UserType>) => {
    delete body._id;
    const data = await fetchAPI<UserType>(baseURL, Methods.POST, body);
    return { data };
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ body, id }: UserUpdateObj) => {
    const data = await fetchAPI<UserType>(
      `${baseURL}/${id}`,
      Methods.PUT,
      body
    );
    return { data };
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId: string) => {
    const id = await fetchAPI<string>(`${baseURL}/${userId}`, Methods.DELETE);
    return { id };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
        toast.success("User created");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
        if (state.user?._id === action.payload.data._id) {
          state.user = action.payload.data;
        }
        toast.success("User updated");
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success("User deleted");
      })
      .addMatcher(
        isAnyOf(
          getUsersData.fulfilled,
          getUserDetails.fulfilled,
          createUser.fulfilled,
          updateUser.fulfilled,
          deleteUser.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsersData.pending,
          getUserDetails.pending,
          createUser.pending,
          updateUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsersData.rejected,
          getUserDetails.rejected,
          createUser.rejected,
          updateUser.rejected,
          deleteUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = true;
        }
      );
  },
});

export const selectUsers = (state: IGlobalStore) => state.users.users;
export const selectUserDetail = (state: IGlobalStore) => state.users.user;
export const selectIsLoading = (state: IGlobalStore) => state.users.isLoading;
export const selectHasError = (state: IGlobalStore) => state.users.hasError;

export default usersSlice.reducer;
