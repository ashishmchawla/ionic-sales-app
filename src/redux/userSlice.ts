import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    notifications: true,
    tokens: [],
  },
  reducers: {
    saveUser: (state, payload: any) => {
      state._id = payload._id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.notifications = payload.notifications;
      state.tokens = payload.tokens;
    },
    updateTokens: (state, payload: any) => {
      state.tokens = payload.tokens;
    },
  },
});

export const { saveUser, updateTokens } = userSlice.actions;
export default userSlice.reducer;
