import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

const initialState = {
  isMobile: false,
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    toggleMobile(state) {
      state.isMobile = window.innerWidth <= 540;
    },
  },
});

export const mobileSelector = (state: RootState) => state.mobile;
export const { toggleMobile } = mobileSlice.actions;
export default mobileSlice.reducer;
