import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phoneNumber: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setName, setEmail, setPhoneNumber } = formSlice.actions;

export default formSlice.reducer;
