import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./slice/adminProductSlice";

export const store = configureStore({
  reducer: {
    adminProduct: adminProductReducer,
  }
})