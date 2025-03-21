import { loginApi } from "@/apis/api";
import { AuthInitialState } from "@/types/authPayload";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginResponseData, ValidationErrorDataItem } from "@repo/types";

const initialState: AuthInitialState = {
  isLoading: false,
  isLogin: false,
  token: "",
  user: null,
  errorLoginMessage: "",
  errorData: [],
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const response = await loginApi(email, password);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    initialize: (state, action) => {
      const { auth } = action.payload;
      state.token = auth.token;
      state.user = auth.user;
      state.isLogin = auth.isLogin;
      state.isLoading = auth.isLoading;
      state.errorData = auth.errorData;
      state.errorLoginMessage = auth.errorLoginMessage;
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isLogin = false;
      state.isLoading = false;
      state.errorData = [];
      state.errorLoginMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.isLogin = false;
      state.errorData = [];
      state.errorLoginMessage = "";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload && action.payload.status === "error") {
        // if login failed
        state.errorLoginMessage = action.payload.message;
        state.isLogin = false;
        if (action.payload.data === null) {
          state.errorData = [];
        } else {
          state.errorData = action.payload
            .data as unknown as ValidationErrorDataItem[];
        }
      } else {
        // if login success
        const { token, user } = action.payload.data as LoginResponseData;
        state.isLogin = true;
        state.token = token;
        state.user = user;
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.errorData = [];
      state.errorLoginMessage = "";
      state.errorLoginMessage = "Login failed";
    });
  },
});

export const { initialize, logout } = authSlice.actions;
export default authSlice.reducer;
