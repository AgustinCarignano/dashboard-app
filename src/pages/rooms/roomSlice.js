import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllData, getItemData } from "../../mockService/service";

const initialState = {
  rooms: [],
  room: {},
  isLoading: true,
  hasError: false,
};

export const getRoomsData = createAsyncThunk("rooms/getAllRooms", async () => {
  const data = await getAllData("rooms_data.json");
  return { data };
});

export const getRoomDetails = createAsyncThunk(
  "rooms/getRoomDetails",
  async (id) => {
    const data = await getItemData("rooms_data.json", id);
    return { data };
  }
);

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsData.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getRoomsData.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getRoomsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.rooms = action.payload.data;
      })
      .addCase(getRoomDetails.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getRoomDetails.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.room = action.payload.data;
      });
  },
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomDetails = (state) => state.rooms.room;
export const selectIsLoading = (state) => state.rooms.isLoading;
export const selectHasError = (state) => state.rooms.hasError;

export default roomsSlice.reducer;
