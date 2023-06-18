import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IRoomState, RoomType, RoomUpdateObj } from "../../@types/rooms";
import { IGlobalStore } from "../../@types/store";
import { API_URL, Methods, fetchAPI } from "../../utils/fetchUtils";
import { toast } from "react-toastify";

const baseURL = `${API_URL}/api/rooms`;

const initialState: IRoomState = {
  rooms: [],
  room: {} as RoomType,
  isLoading: true,
  hasError: false,
};

export const getRoomsData = createAsyncThunk("rooms/getAllRooms", async () => {
  const data = await fetchAPI<RoomType[]>(baseURL, Methods.GET);
  return { data };
});

export const getRoomDetails = createAsyncThunk(
  "rooms/getRoomDetails",
  async (id: string) => {
    const data = await fetchAPI<RoomType>(`${baseURL}/${id}`, Methods.GET);
    return { data, id };
  }
);

export const createRoom = createAsyncThunk(
  "rooms/create",
  async (body: Partial<RoomType>) => {
    delete body._id;
    console.log(body);
    const data = await fetchAPI<RoomType>(baseURL, Methods.POST, body);
    return { data };
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/update",
  async ({ body, id }: RoomUpdateObj) => {
    const data = await fetchAPI<RoomType>(
      `${baseURL}/${id}`,
      Methods.PUT,
      body
    );
    return { data };
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/delete",
  async (roomId: string) => {
    const id = await fetchAPI<string>(`${baseURL}/${roomId}`, Methods.DELETE);
    return { id };
  }
);

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsData.fulfilled, (state, action) => {
        state.rooms = action.payload.data;
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.room = action.payload.data;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload.data);
        toast.success("Room created");
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
        if (state.room?._id === action.payload.data._id) {
          state.room = action.payload.data;
        }
        toast.success("Room updated");
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(
          (user) => user._id !== action.payload.id
        );
        toast.success("Room deleted");
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

export const selectRooms = (state: IGlobalStore) => state.rooms.rooms;
export const selectRoomDetails = (state: IGlobalStore) => state.rooms.room;
export const selectIsLoading = (state: IGlobalStore) => state.rooms.isLoading;
export const selectHasError = (state: IGlobalStore) => state.rooms.hasError;

export default roomsSlice.reducer;
