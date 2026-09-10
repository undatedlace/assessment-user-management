import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { UsersActions } from './users.actions';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  error: string | null;
  selectedUserId: string | null;
}

export const usersAdapter = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  loading: false,
  error: null,
  selectedUserId: null,
});

const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    // Load
    on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadUsersSuccess, (state, { users }) =>
      usersAdapter.setAll(users, { ...state, loading: false })
    ),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
      ...state, loading: false, error,
    })),
    // Add
    on(UsersActions.addUser, (state) => ({ ...state, loading: true })),
    on(UsersActions.addUserSuccess, (state, { user }) =>
      usersAdapter.addOne(user, { ...state, loading: false })
    ),
    on(UsersActions.addUserFailure, (state, { error }) => ({
      ...state, loading: false, error,
    })),
    // Update
    on(UsersActions.updateUser, (state) => ({ ...state, loading: true })),
    on(UsersActions.updateUserSuccess, (state, { user }) =>
      usersAdapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false })
    ),
    on(UsersActions.updateUserFailure, (state, { error }) => ({
      ...state, loading: false, error,
    })),
    // Delete
    on(UsersActions.deleteUser, (state) => ({ ...state, loading: true })),
    on(UsersActions.deleteUserSuccess, (state, { id }) =>
      usersAdapter.removeOne(id, { ...state, loading: false })
    ),
    on(UsersActions.deleteUserFailure, (state, { error }) => ({
      ...state, loading: false, error,
    })),
    // Select
    on(UsersActions.selectUser, (state, { id }) => ({
      ...state, selectedUserId: id,
    })),
  ),
  extraSelectors: ({ selectUsersState }) => ({
    selectAllUsers: createSelector(selectUsersState, selectAll),
    selectUserEntities: createSelector(selectUsersState, selectEntities),
    selectSelectedUser: createSelector(selectUsersState, (state) =>
      state.selectedUserId ? (state.entities[state.selectedUserId] ?? null) : null
    ),
  }),
});

export const {
  reducer: usersReducer,
  selectUsersState,
  selectLoading: selectUsersLoading,
  selectError: selectUsersError,
  selectSelectedUserId,
  selectAllUsers,
  selectUserEntities,
  selectSelectedUser,
} = usersFeature;