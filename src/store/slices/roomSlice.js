import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  generateId,
  getAllData,
  getItemData,
  delayFunction,
} from "../../utils";

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
    return { data, id };
  }
);

export const createRoom = createAsyncThunk("rooms/create", async (body) => {
  const id = generateId();
  const data = await delayFunction({ ...body, id });
  return { data };
});

export const updateRoom = createAsyncThunk(
  "rooms/update",
  async ({ body, id }) => {
    const data = await delayFunction({ ...body, id });
    return { data };
  }
);

export const deleteRoom = createAsyncThunk("rooms/delete", async (roomId) => {
  const id = await delayFunction(roomId);
  return { id };
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsData.fulfilled, (state, action) => {
        //state.rooms = action.payload.data;
        if (state.rooms.length === 0) {
          state.rooms = action.payload.data;
        }
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        //state.room = action.payload.data;
        if (action.payload.data) {
          state.room = action.payload.data;
        } else {
          const room = state.rooms.find(
            (item) => item.id === action.payload.id
          );
          state.room = room;
        }
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload.data);
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        if (state.room.id === action.payload.data.id) {
          state.room = action.payload.data;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          getRoomsData.fulfilled,
          getRoomDetails.fulfilled,
          createRoom.fulfilled,
          updateRoom.fulfilled,
          deleteRoom.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getRoomsData.pending,
          getRoomDetails.pending,
          createRoom.pending,
          updateRoom.pending,
          deleteRoom.pending
        ),
        (state) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getRoomsData.rejected,
          getRoomDetails.rejected,
          createRoom.rejected,
          updateRoom.rejected,
          deleteRoom.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = true;
        }
      );
  },
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomDetails = (state) => state.rooms.room;
export const selectIsLoading = (state) => state.rooms.isLoading;
export const selectHasError = (state) => state.rooms.hasError;

export default roomsSlice.reducer;
