import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
//import { delayFunction, getAllData } from "../../utils";
import {
  ContactType,
  ContactUpdateObj,
  IContactState,
} from "../../@types/contacts";
import { IGlobalStore } from "../../@types/store";
import contact_data from "../../mockData/contact_data.json";

const initialState: IContactState = {
  contacts: [],
  unreadContacts: 0,
  isLoading: true,
  hasError: false,
};

export const getAllContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    //const data = await getAllData("contact_data.json");
    const data = await new Promise<ContactType[]>((resolve) => {
      setTimeout(() => {
        resolve(contact_data);
      }, 300);
    });
    return { data };
  }
);

export const updateContact = createAsyncThunk(
  "contatcs/update",
  async ({ body, id }: ContactUpdateObj) => {
    // const data = await delayFunction({ ...body, id });
    const data = await new Promise<ContactType>((resolve) => {
      setTimeout(() => {
        resolve({ ...body, id });
      }, 300);
    });
    return { data };
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
          (cont: ContactType) => !cont.read
        ).length;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        state.unreadContacts = state.contacts.filter(
          (cont: ContactType) => !cont.read
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
