import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersActions } from './users.actions';
import { UserService } from '../../core/services/user/user'; // created in Phase 3

export const loadUsersEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error: error.message }))
          ),
        )
      ),
    ),
  { functional: true },
);

export const addUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(({ user }) =>
        userService.addUser(user).pipe(
          map((newUser) => UsersActions.addUserSuccess({ user: newUser })),
          catchError((error) =>
            of(UsersActions.addUserFailure({ error: error.message }))
          ),
        )
      ),
    ),
  { functional: true },
);

export const updateUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap(({ user }) =>
        userService.updateUser(user).pipe(
          map((updated) => UsersActions.updateUserSuccess({ user: updated })),
          catchError((error) =>
            of(UsersActions.updateUserFailure({ error: error.message }))
          ),
        )
      ),
    ),
  { functional: true },
);

export const deleteUserEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) =>
    actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ id }) =>
        userService.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) =>
            of(UsersActions.deleteUserFailure({ error: error.message }))
          ),
        )
      ),
    ),
  { functional: true },
);