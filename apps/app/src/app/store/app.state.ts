import { AuthState } from './auth/auth.reducer';
import { UsersState } from './users/users.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
}