import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./Slices/emailSlice";

export const store = configureStore({
    reducer: {
      email: emailSlice
    }
  })