import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllData,
  getItemData,
  delayFunction,
} from "../../mockService/service.js";
import { generateId } from "../../utils";

const initialState = {
  users: [],
  user: {},
  isLoading: true,
  hasError: false,
};

export const getUsersData = createAsyncThunk("users/getAllUsers", async () => {
  const data = await getAllData("users_data.json");
  return { data };
});

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id) => {
    const data = await getItemData("users_data.json", id);
    return { data };
  }
);

export const createUser = createAsyncThunk("users/create", async (body) => {
  const id = generateId();
  const data = await delayFunction({ ...body, id });
  return { data };
});

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ body, id }) => {
    const data = await delayFunction({ ...body, id });
    return { data };
  }
);

export const deleteUser = createAsyncThunk("users/delete", async (userId) => {
  const id = await delayFunction(userId);
  return { id };
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getUsersData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.users = action.payload.data;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.user = action.payload.data;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.users.push(action.payload.data);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.data.id
        );
        state.users.splice(index, 1, action.payload.data);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index > 0) state.users.splice(index, 1);
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectUserDetail = (state) => state.users.user;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectHasError = (state) => state.users.hasError;

export default usersSlice.reducer;
