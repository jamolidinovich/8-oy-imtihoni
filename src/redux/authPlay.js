import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    trackUrls: [],
  },
  reducers: {
    setTrackUrls: (state, action) => {
      state.trackUrls = action.payload;
    },
  },
});

export const { setTrackUrls } = authSlice.actions;

export default authSlice.reducer;
