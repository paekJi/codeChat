import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import messageSlice from "./slice/messageSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 리듀서를 스토어에 추가
    message :  messageSlice
  },
});
export default store;
