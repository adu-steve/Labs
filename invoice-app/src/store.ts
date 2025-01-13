import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/theme.slice.ts";
import invoiceReducer from "./features/invoice/invoice.slice.ts";
import mobileReducer from "./features/mobile/mobile.slice.tsx";

const rootReducers = combineReducers({
  theme: themeReducer,
  invoice: invoiceReducer,
  mobile: mobileReducer,
});

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducers,
    preloadedState,
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = AppStore["dispatch"];