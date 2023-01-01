import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  id?: string;
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
  userToken: string;
}

export const initialState: AuthState = {
  isAuth: false,
  error: { message: "" },
  userToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setAuthToken: (state, { payload }: PayloadAction<string>) => {
      state.userToken = payload;
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
      state.error.message = "";
    },
    setAuthFailed: (state, { payload }: PayloadAction<string>) => {
      state.error.message = payload;
      state.isAuth = false;
    },
  },
});

export const { setAuthSuccess, setAuthToken, setAuthFailed, setLogOut } =
  userSlice.actions;
export default userSlice.reducer;
