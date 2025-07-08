import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);


    constructor() {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) => AuthActions.loginSuccess({
            user: response.user,
            token: response.token
          })),
          catchError((error) => of(AuthActions.loginFailure({
            error: error.error?.message || 'Login failed'
          })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user, token }) => {
        this.authService.storeAuthData(token, user);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearAuthData();
        this.router.navigate(['/admin/login']);
      })
    ),
    { dispatch: false }
  );

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthStatus),
      map(() => {
        const token = this.authService.getToken();
        const user = this.authService.getUserFromStorage();
        
        if (token && user) {
          return AuthActions.setAuthenticatedUser({ user, token });
        } else {
          return AuthActions.clearAuthState();
        }
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map((response) => AuthActions.registerSuccess({
            user: response.user,
            token: response.token
          })),
          catchError((error) =>
            of(AuthActions.registerFailure({
              error: error?.error?.message || 'Registration failed.'
            }))
          )
        )
      )
    )
  );
}