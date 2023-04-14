import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { delayFunction, getAllData } from "../../utils";

const initialState = {
  contacts: [],
  unreadContacts: null,
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

export const updateContact = createAsyncThunk(
  "contatcs/update",
  async ({ body, id }) => {
    const data = await delayFunction({ ...body, id });
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
        state.unreadContacts = action.payload.data.filter(
          (cont) => !cont.read
        ).length;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const index = state.contacts.findIndex(
          (item) => item.id === action.payload.data.id
        );
        const newContact = { ...state.contacts[index], ...action.payload.data };
        state.contacts.splice(index, 1, newContact);
        state.unreadContacts = state.contacts.filter(
          (cont) => !cont.read
        ).length;
      });
  },
});

export const selectContacts = (state) => state.contacts.contacts;
export const selectUnreadContacts = (state) => state.contacts.unreadContacts;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectHasError = (state) => state.contacts.hasError;

export default contactSlice.reducer;
