import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  notifications?: true;
  token: string;
}
export interface AuthError {
  message: string;
}
export interface AuthState {
  isAuth: boolean;
  currentUser?: CurrentUser;
  error: AuthError;
}

export const initialState: AuthState = {
  isAuth: false,
  error: { message: "An Error occurred" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
    },
    setAuthFailed: (state, { payload }: PayloadAction<string>) => {
      state.error.message = payload;
      state.isAuth = false;
    },
  },
});

export const { setAuthSuccess, setAuthFailed, setLogOut } = userSlice.actions;
export default userSlice.reducer;
