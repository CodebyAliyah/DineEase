
import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slices/userSlice";
import productReducer from "../redux/slices/productSlice"
export const store = configureStore({
  reducer: {
    user: useReducer,
    product:productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
