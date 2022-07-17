import { authConfig } from 'constants/index';
import { User } from 'models';

export const auth = {
  isLoggedIn() {
    return Boolean(localStorage.getItem(authConfig.ACCESS_TOKEN));
  },

  getUserInfo() {
    const userJson = localStorage.getItem(authConfig.CURRENT_USER);
    if (!userJson) return undefined;

    return JSON.parse(userJson) as User;
  },

  setUserInfo(user: User) {
    localStorage.setItem(authConfig.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(authConfig.ACCESS_TOKEN, 'fake_login');
  },

  clearUserInfo() {
    localStorage.removeItem(authConfig.CURRENT_USER);
    localStorage.removeItem(authConfig.ACCESS_TOKEN);
  },
};
