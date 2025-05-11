import { combineReducers } from "@reduxjs/toolkit";
import { todoApi } from "@/features/api/todoApi";

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
});

export default rootReducer;
