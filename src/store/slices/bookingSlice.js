import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
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
      .addCase(getBookingsData.fulfilled, (state, action) => {
        state.bookings = action.payload.data;
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        state.booking = action.payload.data;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload.data);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        if (state.booking.id === action.payload.data.id) {
          state.booking = action.payload.data;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          getBookingsData.fulfilled,
          getBookingDetails.fulfilled,
          updateBooking.fulfilled,
          createBooking.fulfilled,
          deleteBooking.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getBookingsData.pending,
          getBookingDetails.pending,
          updateBooking.pending,
          createBooking.pending,
          deleteBooking.pending
        ),
        (state) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getBookingsData.rejected,
          getBookingDetails.rejected,
          updateBooking.rejected,
          createBooking.rejected,
          deleteBooking.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = true;
        }
      );
  },
});

export const selectBookings = (state) => state.bookings.bookings;
export const selectBookingDetail = (state) => state.bookings.booking;
export const selectIsLoading = (state) => state.bookings.isLoading;
export const selectHasError = (state) => state.bookings.hasError;

export default bookingsSlice.reducer;
