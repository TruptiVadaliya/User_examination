import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  users: JSON.parse(localStorage.getItem('users')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn', 'true');
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem('currentUser');
      localStorage.setItem('isLoggedIn', 'false');
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
