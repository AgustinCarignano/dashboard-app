import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { generateId, hashData } from "../../utils";
import { IUserState, UserType, UserUpdateObj } from "../../@types/users";
import user_data from "../../mockData/users_data.json";
import { IGlobalStore } from "../../@types/store";

const initialState: IUserState = {
  users: [],
  user: {} as UserType,
  isLoading: true,
  hasError: false,
};

export const getUsersData = createAsyncThunk("users/getAllUsers", async () => {
  //const data = await getAllData("users_data.json");
  const data = await new Promise<UserType[]>((resolve) => {
    setTimeout(() => {
      resolve(user_data);
    }, 300);
  });
  return { data };
});

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (id: string) => {
    //const data = await getItemData("users_data.json", id);
    const allData = await new Promise<UserType[]>((resolve) => {
      setTimeout(() => {
        resolve(user_data);
      }, 300);
    });
    const data = allData.find((item) => item.id === id);
    return { data, id };
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (body: UserType) => {
    const id = generateId();
    const hashedPassword = hashData(body.password);
    //const data = await delayFunction({ ...body, id, password: hashedPassword });
    const data = await new Promise<UserType>((resolve) => {
      setTimeout(() => {
        resolve({ ...body, id, password: hashedPassword });
      }, 300);
    });
    return { data };
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ body, id }: UserUpdateObj) => {
    //const data = await delayFunction({ ...body, id });
    const data = await new Promise<UserType>((resolve) => {
      setTimeout(() => {
        resolve({ ...body, id });
      }, 300);
    });
    return { data };
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId: string) => {
    //const id = await delayFunction(userId);
    const id = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 300);
    });
    return { id };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
        //state.users = action.payload.data;
        if (state.users.length === 0) {
          state.users = action.payload.data;
        }
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        //state.user = action.payload.data;
        if (action.payload.data) {
          state.user = action.payload.data;
        } else {
          const user = state.users.find(
            (item) => item.id === action.payload.id
          );
          if (user) state.user = user;
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        if (state.user?.id === action.payload.data.id) {
          state.user = action.payload.data;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          getUsersData.fulfilled,
          getUserDetails.fulfilled,
          createUser.fulfilled,
          updateUser.fulfilled,
          deleteUser.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsersData.pending,
          getUserDetails.pending,
          createUser.pending,
          updateUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.isLoading = true;
          state.hasError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getUsersData.rejected,
          getUserDetails.rejected,
          createUser.rejected,
          updateUser.rejected,
          deleteUser.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.hasError = true;
        }
      );
  },
});

export const selectUsers = (state: IGlobalStore) => state.users.users;
export const selectUserDetail = (state: IGlobalStore) => state.users.user;
export const selectIsLoading = (state: IGlobalStore) => state.users.isLoading;
export const selectHasError = (state: IGlobalStore) => state.users.hasError;

export default usersSlice.reducer;
