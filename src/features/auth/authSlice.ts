import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models';
import { auth } from 'utils';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  logging: false,
  isLoggedIn: auth.isLoggedIn(),
  currentUser: auth.getUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const selectLogging = (state: RootState) => state.auth.logging;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
