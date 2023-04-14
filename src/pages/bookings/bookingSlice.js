import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  generateId,
  delayFunction,
  getAllData,
  getItemData,
} from "../../utils";

const initialState = {
  bookings: [],
  booking: {},
  isLoading: false,
  hasError: false,
};

export const getBookingsData = createAsyncThunk(
  "bookings/getAllBookings",
  async () => {
    const data = await getAllData("bookings_data.json");
    return { data };
  }
);

export const getBookingDetails = createAsyncThunk(
  "bookings/getBookingDetails",
  async (id) => {
    const data = await getItemData("bookings_data.json", id);
    return { data };
  }
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (body) => {
    const id = generateId();
    const data = await delayFunction({ ...body, id });
    return { data };
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/update",
  async ({ body, id }) => {
    const data = await delayFunction({ ...body, id });
    return { data };
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (bookingId) => {
    const id = await delayFunction(bookingId);
    return { id };
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBookingsData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getBookingsData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getBookingsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.bookings = action.payload.data;
      })
      .addCase(getBookingDetails.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.booking = action.payload.data;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.bookings.push(action.payload.data);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const index = state.bookings.findIndex(
          (book) => book.id === action.payload.data.id
        );
        state.bookings.splice(index, 1, action.payload.data);
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const index = state.bookings.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) state.bookings.splice(index, 1);
      });
  },
});

export const selectBookings = (state) => state.bookings.bookings;
export const selectBookingDetail = (state) => state.bookings.booking;
export const selectIsLoading = (state) => state.bookings.isLoading;
export const selectHasError = (state) => state.bookings.hasError;

export default bookingsSlice.reducer;
