import { configureStore } from "@reduxjs/toolkit";
import bookingsSliceReducer from "../pages/bookings/bookingSlice";
import roomsSliceReducer from "../pages/rooms/roomSlice";
import usersSliceReducer from "../pages/users/usersSlice";
import contactSliceReducer from "../pages/contact/contactSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsSliceReducer,
    rooms: roomsSliceReducer,
    users: usersSliceReducer,
    contacts: contactSliceReducer,
  },
});
