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
      console.log(state.userInfo);
    },
    
    clearUser: (state) => {
      state.userInfo = null; 
    },
  },
});

export const userReducer = userSlice.actions;
export default userSlice.reducer;
