import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  generateId,
  delayFunction,
  getAllData,
  getItemData,
} from "../../utils";
import bookings_data from "../../../public/mockData/bookings_data.json";
import {
  BookingType,
  BookingUpdateObj,
  IBookingState,
} from "../../@types/bookings";
import { IGlobalStore } from "../../@types/store";

const emptyBooking: BookingType = {
  id: "",
  guest: "",
  specialRequest: "",
  orderDate: null,
  roomType: "",
  status: "",
  checkIn: null,
  checkOut: null,
  roomId: "",
  roomNumber: "",
  roomImg: "",
};

const initialState: IBookingState = {
  bookings: [],
  booking: { ...emptyBooking },
  isLoading: false,
  hasError: false,
};

export const getBookingsData = createAsyncThunk(
  "bookings/getAllBookings",
  async () => {
    //const data = await getAllData("bookings_data.json");
    const data = await new Promise<BookingType[]>((resolve) => {
      setTimeout(() => {
        resolve(bookings_data);
      }, 300);
    });
    return { data };
  }
);

export const getBookingDetails = createAsyncThunk(
  "bookings/getBookingDetails",
  async (id: "") => {
    //const data = await getItemData("bookings_data.json", id);
    const data = await new Promise<BookingType>((resolve) => {
      const allData = bookings_data;
      const itemData = allData.find((item) => item.id === id);
      if (itemData) {
        setTimeout(() => {
          resolve(itemData);
        }, 300);
      }
    });
    return { data, id };
  }
);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (body: BookingType) => {
    const id = generateId();
    //const data = await delayFunction({ ...body, id });
    const data = await new Promise<BookingType>((resolve) => {
      setTimeout(() => {
        resolve({ ...body, id });
      }, 300);
    });
    return { data };
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/update",
  async ({ body, id }: BookingUpdateObj) => {
    //const data = await delayFunction({ ...body, id });
    const data = await new Promise<BookingType>((resolve) => {
      setTimeout(() => {
        resolve({ ...body, id });
      }, 300);
    });
    return { data };
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (bookingId) => {
    //const id = await delayFunction(bookingId);
    const id = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookingId);
      }, 300);
    });
    return { id };
  }
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookingsData.fulfilled, (state, action) => {
        //state.bookings = action.payload.data;
        if (state.bookings.length === 0) {
          state.bookings = action.payload.data;
        }
      })
      .addCase(getBookingDetails.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.booking = action.payload.data;
        } else {
          const booking = state.bookings.find(
            (item) => item.id === action.payload.id
          );
          if (booking) state.booking = booking;
        }
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

export const selectBookings = (state: IGlobalStore) => state.bookings.bookings;
export const selectBookingDetail = (state: IGlobalStore) =>
  state.bookings.booking;
export const selectIsLoading = (state: IGlobalStore) =>
  state.bookings.isLoading;
export const selectHasError = (state: IGlobalStore) => state.bookings.hasError;

export default bookingsSlice.reducer;
