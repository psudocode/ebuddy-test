import { fetchMeApi, fetchUsersApi, updateMeApi } from "@/apis/api";
import { UserInitialState } from "@/types/authPayload";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, ValidationErrorDataItem } from "@repo/types";

const initialState: UserInitialState = {
  me: null,
  users: [],
  meFetchingStatus: "idle",
  meUpdatingStatus: "idle",
  usersFetchingStatus: "idle",
  errorUpdatingMessage: "",
  errorUpdatingData: [],
};

export const fetchMeThunk = createAsyncThunk("user/fetchMe", async () => {
  const response = await fetchMeApi();
  return response.data;
});

export const updateMeThunk = createAsyncThunk(
  "user/updateMe",
  async (payload: { name: string; username: string }) => {
    const response = await updateMeApi(payload);
    return response.data;
  }
);

export const fetchUsersThunk = createAsyncThunk("user/fetchUsers", async () => {
  console.log("fetching users thunk");
  const response = await fetchUsersApi();
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH USERS
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.usersFetchingStatus = "fetching";
    });

    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      console.log("fetch users thunk fulfilled");
      state.usersFetchingStatus = "idle";
      if (!action.payload.data) return;
      const dirtyUsers = action.payload.data as User[];
      // remove password from the response
      const cleanUsers = dirtyUsers.map((user: User) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;
        return rest;
      });
      state.users = cleanUsers as User[];
    });

    builder.addCase(fetchUsersThunk.rejected, (state) => {
      state.usersFetchingStatus = "failed";
    });

    // FETCH ME
    builder.addCase(fetchMeThunk.pending, (state) => {
      state.meFetchingStatus = "fetching";
    });

    builder.addCase(fetchMeThunk.fulfilled, (state, action) => {
      state.meFetchingStatus = "idle";
      if (!action.payload?.data) return;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = action.payload.data as User;
      state.me = rest as User;
    });

    builder.addCase(fetchMeThunk.rejected, (state) => {
      state.meFetchingStatus = "failed";
    });

    // UPDATE
    builder.addCase(updateMeThunk.pending, (state) => {
      state.meUpdatingStatus = "updating";
    });

    builder.addCase(updateMeThunk.fulfilled, (state, action) => {
      state.meUpdatingStatus = "idle";

      if (action.payload.data === null) {
        return;
      }

      if (action.payload.status === "error") {
        state.errorUpdatingMessage = action.payload.message;
        state.errorUpdatingData = action.payload
          .data as ValidationErrorDataItem[];
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = action.payload.data as User;
        state.errorUpdatingMessage = "";
        state.errorUpdatingData = [];
        state.me = rest as User;
      }
    });

    builder.addCase(updateMeThunk.rejected, (state) => {
      state.meUpdatingStatus = "failed";
    });
  },
});

export default userSlice.reducer;
