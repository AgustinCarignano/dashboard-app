import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  ContactType,
  ContactUpdateObj,
  IContactState,
} from "../../@types/contacts";
import { IGlobalStore } from "../../@types/store";
import { API_URL, fetchAPI, Methods } from "../../utils/fetchUtils";

const baseURL = `${API_URL}/api/contacts`;

const initialState: IContactState = {
  contacts: [],
  unreadContacts: 0,
  isLoading: true,
  hasError: false,
};

export const getAllContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const { error, data } = await fetchAPI<ContactType[]>(baseURL, Methods.GET);
    if (data) return { data };
    else throw new Error(error?.status.toString());
  }
);

export const updateContact = createAsyncThunk(
  "contatcs/update",
  async ({ body, id }: ContactUpdateObj) => {
    const { error, data } = await fetchAPI<ContactType>(
      `${baseURL}/${id}`,
      Methods.PUT,
      body
    );
    if (data) return { data };
    else throw new Error(error?.status.toString() || "Unknown error");
  }
);

export const contactSlice = createSlice({
  name: "contatcs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data;
        state.unreadContacts = action.payload.data.filter(
          (cont: ContactType) => !cont._read
        ).length;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
        state.unreadContacts = state.contacts.filter(
          (cont: ContactType) => !cont._read
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

export const selectContacts = (state: IGlobalStore) => state.contacts.contacts;
export const selectUnreadContacts = (state: IGlobalStore) =>
  state.contacts.unreadContacts;
export const selectIsLoading = (state: IGlobalStore) =>
  state.contacts.isLoading;
export const selectHasError = (state: IGlobalStore) => state.contacts.hasError;

export default contactSlice.reducer;
