import { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  timeFrame: string;
  plan: { price: number; title: string };
}
const initialState: FormState = {
  timeFrame: "monthly",
  plan: { price: 9, title: "arcade" },
};

const planSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPlan: (
      state,
      action: PayloadAction<{ price: number; title: string }>
    ) => {
      state.plan = action.payload;
    },
    setTimeFrame: (state, action: PayloadAction<string>) => {
      state.timeFrame = action.payload;
    },
  },
});

export const { setPlan, setTimeFrame } = planSlice.actions;

export default planSlice.reducer;
