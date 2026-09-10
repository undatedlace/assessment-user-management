import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.login, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.loginSuccess, (state) => ({
      ...state,
      loading: false,
      isAuthenticated: true,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(AuthActions.logout, () => initialState),
  ),
});

export const {
  reducer: authReducer,
  selectIsAuthenticated,
  selectLoading: selectAuthLoading,
  selectError: selectAuthError,
} = authFeature;