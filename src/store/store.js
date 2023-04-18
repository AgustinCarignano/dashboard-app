import { configureStore } from "@reduxjs/toolkit";
import bookingsSliceReducer from "./slices/bookingSlice";
import roomsSliceReducer from "./slices/roomSlice";
import usersSliceReducer from "./slices/usersSlice";
import contactSliceReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSliceReducer,
    rooms: roomsSliceReducer,
    users: usersSliceReducer,
    contacts: contactSliceReducer,
  },
});
