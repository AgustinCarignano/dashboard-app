import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  BookingType,
  BookingUpdateObj,
  IBookingState,
} from "../../@types/bookings";
import { IGlobalStore } from "../../@types/store";
import { API_URL, fetchAPI, Methods } from "../../utils/fetchUtils";
import { toast } from "react-toastify";

const initialState: IBookingState = {
  bookings: [],
  booking: {} as BookingType,
  isLoading: false,
  hasError: false,
};

const baseURL = `${API_URL}/api/bookings`;

export const getBookingsData = createAsyncThunk(
  "bookings/getAllBookings",
  async () => {
    const { error, data } = await fetchAPI<BookingType[]>(baseURL, Methods.GET);
    if (data) return { data };
    else throw new Error(error?.status.toString());
  }
);

export const getBookingDetails = createAsyncThunk(
  "bookings/getBookingDetails",
  async (id: string) => {
    const { error, data } = await fetchAPI<BookingType>(
      `${baseURL}/${id}`,
      Methods.GET
    );
    if (data) return { data, id };
    else throw new Error(error?.status.toString());
  }
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (body: Partial<BookingType>) => {
    delete body._id;
    const { error, data } = await fetchAPI<BookingType>(
      baseURL,
      Methods.POST,
      body
    );
    if (data) return { data };
    else throw new Error(error?.status.toString());
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/update",
  async ({ body, id }: BookingUpdateObj) => {
    const { error, data } = await fetchAPI<BookingType>(
      `${baseURL}/${id}`,
      Methods.PUT,
      body
    );
    if (data) return { data };
    else throw new Error(error?.status.toString());
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (bookingId: string) => {
    const { error, data } = await fetchAPI<string>(
      `${baseURL}/${bookingId}`,
      Methods.DELETE
    );
    if (data) return { id: data };
    else throw new Error(error?.status.toString());
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
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
        toast.success("Bookings created");
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
        if (state.booking._id === action.payload.data._id) {
          state.booking = action.payload.data;
        }
        toast.success("Bookings updated");
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (item) => item._id !== action.payload.id
        );
        toast.success("Bookings deleted");
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
          toast.error("There has been an error. Please, try again.");
        }
      );
  },
});

export const selectBookings = (state: IGlobalStore) => state.bookings.bookings;
export const selectBookingDetail = (state: IGlobalStore) =>
  state.bookings.booking;
export const selectIsLoading = (state: IGlobalStore) =>
  state.bookings.isLoading;
export const selectHasError = (state: IGlobalStore) => state.bookings.hasError;

export default bookingsSlice.reducer;
