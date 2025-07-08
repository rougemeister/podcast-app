import { createAction, props } from '@ngrx/store';
import { LoginCredentials, User } from '../../core/model/model';
import { RegisterCredentials } from '../../core/model/model'; 

// ---------------------------
// Login actions
// ---------------------------
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// ---------------------------
// Register actions
// ---------------------------


export const register = createAction(
  '[Auth] Register',
  props<{ credentials: RegisterCredentials }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User; token: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// ---------------------------
// Other auth actions
// ---------------------------
export const logout = createAction(
  '[Auth] Logout'
);

export const checkAuthStatus = createAction(
  '[Auth] Check Auth Status'
);

export const setAuthenticatedUser = createAction(
  '[Auth] Set Authenticated User',
  props<{ user: User; token: string }>()
);

export const clearAuthState = createAction(
  '[Auth] Clear Auth State'
);
