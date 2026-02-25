import { createSlice } from "@reduxjs/toolkit";



const getUserFromStorage = () => {
  try {
    const data = localStorage.getItem('userInfo');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getUserFromStorage(),
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    signOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setUser, signOut } = userSlice.actions;
export default userSlice.reducer;
