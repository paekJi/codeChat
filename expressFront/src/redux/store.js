import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../redux/slice/messageSlice"

const store = configureStore({
  reducer: {
    message :  messageReducer
  },
});
export default store;
