import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
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
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data;
        state.unreadContacts = action.payload.data.filter(
          (cont) => !cont.read
        ).length;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        state.unreadContacts = state.contacts.filter(
          (cont) => !cont.read
        ).length;
      })
      .addMatcher(
        isAnyOf(getAllContacts.fulfilled, updateContact.fulfilled),
        (state) => {
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(getAllContacts.pending, updateContact.pending),
        (state) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(getAllContacts.rejected, updateContact.rejected),
        (state) => {
          state.isLoading = false;
          state.hasError = true;
        }
      );
  },
});

export const selectContacts = (state) => state.contacts.contacts;
export const selectUnreadContacts = (state) => state.contacts.unreadContacts;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectHasError = (state) => state.contacts.hasError;

export default contactSlice.reducer;
