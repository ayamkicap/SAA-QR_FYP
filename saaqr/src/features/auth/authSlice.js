import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  status: 'Student' // Default status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, status } = action.payload;
      state.token = accessToken;
      state.status = status;
    },
    logOut: (state, action) => {
      state.token = null;
      state.status = 'Student'; // Reset status to default on logout
    },
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectStatus = (state) => state.auth.status // Add selector for status
