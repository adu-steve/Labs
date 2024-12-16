// store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import planReducer from "./features/planSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    plan: planReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
