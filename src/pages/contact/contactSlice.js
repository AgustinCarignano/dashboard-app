import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllData } from "../../mockService/service";

const initialState = {
  contacts: [],
  isLoading: true,
  hasError: false,
};

export const getAllContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const data = await getAllData("contact_data.json");
    return { data };
  }
);

export const contactSlice = createSlice({
  name: "contatcs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllContacts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.contacts = action.payload.data;
      });
  },
});

export const selectContacts = (state) => state.contacts.contacts;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectHasError = (state) => state.contacts.hasError;

export default contactSlice.reducer;
