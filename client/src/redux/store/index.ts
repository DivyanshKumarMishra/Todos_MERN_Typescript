import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../slices/todoSlice";
import UserReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
    user: UserReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;