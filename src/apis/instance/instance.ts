import { AnyAction, CombinedState, ThunkMiddleware } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-unresolved
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios, { AxiosError } from 'axios';

import { apiRoutes, localStorageData, responseStatus, routes } from 'shared';
import { isTokenExpired } from 'shared/utils';
import { logoutUser, refreshToken } from 'store/actions';
import { AppState, UserState, AuthState } from 'store/types';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const PUBLIC_ROUTES = [
  routes.notFound,
  routes.auth.login,
  apiRoutes.auth.logout,
  routes.auth.register,
  apiRoutes.auth.social,
  apiRoutes.auth.github,
  apiRoutes.auth.twitter,
  apiRoutes.auth.refresh,
  apiRoutes.reviews.base,
  apiRoutes.reviews.userReviews,
  apiRoutes.tags.base,
  apiRoutes.currentUser.base,
];

let store: ToolkitStore<
  CombinedState<{
    appReducer: AppState;
    authReducer: AuthState;
    userReducer: UserState;
  }>,
  AnyAction,
  [
    ThunkMiddleware<
      CombinedState<{
        appReducer: AppState;
        authReducer: AuthState;
        userReducer: UserState;
      }>,
      AnyAction,
      undefined
    >,
  ]
>;

export const injectStore = (_store: any): void => {
  store = _store;
};

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async config => {
  if (config.url) {
    const cleanUrl = config.url.slice(0, config.url.indexOf('?'));

    if (PUBLIC_ROUTES.includes(config.url) || PUBLIC_ROUTES.includes(cleanUrl)) {
      return config;
    }
  }

  const { token } = await JSON.parse(
    localStorage.getItem(localStorageData.userData) as string,
  );
  const { isUserAuth } = store.getState().authReducer;

  if (token) {
    const authorization = `Bearer ${token}`;

    config.headers = {
      ...config.headers,
      authorization,
    };
  }

  if (isTokenExpired() && isUserAuth) {
    store.dispatch(refreshToken());
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const { isUserAuth } = store.getState().authReducer;

    if (
      error.response?.status === responseStatus.unAuthorized &&
      isUserAuth &&
      error.request.url !== apiRoutes.auth.logout
    ) {
      store.dispatch(logoutUser());
    }

    throw error;
  },
);
