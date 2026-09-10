import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string; password: string }>(),
    'Login Success': emptyProps(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
  },
});