// src/features/auth/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchConfig from "../../fetchConfig";
import { RootState } from "../../store";
import { toast } from "sonner";

// Define the initial state of the auth slice
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

// Create an async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchConfig.post("/login", credentials);
    //   const data = await response.json();
      
      
      if (response.token) {
        console.log(response.token);
        
        localStorage.setItem("token", response.token);
        return response.token;
        
        
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create an async thunk for logging out
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle login
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

      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.loading = "idle";
        state.error = null;
        toast.success("Logout successful");
      });
  },
});

// Export the auth selector
export const selectAuth = (state: RootState) => state.auth;

// Export the auth reducer
export default authSlice.reducer;
