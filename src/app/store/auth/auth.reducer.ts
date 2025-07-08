import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';



export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  })),
  on(AuthActions.setAuthenticatedUser, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.clearAuthState, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }))
);