import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models';
import { push } from 'redux-first-history';
import { call, delay, fork, put, select, take } from 'redux-saga/effects';
import { auth } from 'utils';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    const user: User = {
      id: 1,
      name: 'Huy Nguyen',
    };

    yield delay(1000);

    auth.setUserInfo(user);

    yield put(authActions.loginSuccess(user));
  } catch (error) {
    alert('username or password is not valid!');
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  auth.clearUserInfo();

  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn: boolean = yield select((state: RootState) => state.auth.isLoggedIn);

    if (isLoggedIn) {
      yield take(authActions.logout.toString());
      yield call(handleLogout);
    } else {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.toString());
      yield call(handleLogin, action.payload);
    }
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
