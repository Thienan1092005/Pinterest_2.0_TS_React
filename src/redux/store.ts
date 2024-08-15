import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    search: searchSlice,
  },
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
