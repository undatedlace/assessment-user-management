import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../core/services/auth/auth'; // created in Phase 3

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        authService.login(username, password).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message ?? 'Login failed' }))
          ),
        )
      ),
    ),
  { functional: true },
);

export const loginSuccessEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
  ) =>
    actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => router.navigate(['/users'])),
    ),
  { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
  ) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => router.navigate(['/login'])),
    ),
  { functional: true, dispatch: false },
);