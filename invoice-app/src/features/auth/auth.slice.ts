// src/features/auth/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {  post } from "../../components/fetchConfig";
import { RootState } from "../../store";
import { toast } from "sonner";

interface AuthState {
  token: string | null;
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await post("/login", credentials);
      if (response.token) {
        localStorage.setItem("token", response.token);
        return response.token;
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = "succeeded";
        state.token = action.payload;
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.loading = "idle";
        state.error = null;
        toast.success("Logout successful");
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
