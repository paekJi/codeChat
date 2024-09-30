// userSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload; 
    },
    clearUser: (state) => {
      state.userInfo = null; 
    },
  },
});

// 액션 생성자 내보내기
export const { setUser, clearUser } = userSlice.actions;

// 리듀서 내보내기
export default userSlice.reducer;
