import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllData, getItemData } from "../../mockService/service.js";

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
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectUserDetail = (state) => state.users.user;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectHasError = (state) => state.users.hasError;

export default usersSlice.reducer;
