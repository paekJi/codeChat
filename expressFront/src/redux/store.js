import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // 사용자 리듀서를 스토어에 추가
  },
});
export default store;
