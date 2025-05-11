import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { todoApi } from "@/features/api/todoApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(todoApi.middleware),
});
