import { usersFeature, usersAdapter } from './users.reducer';
import { UsersActions } from './users.actions';
import { User } from '../../shared/models/user.model';

const reducer = usersFeature.reducer;
const mockUser: User = { id: '1', username: 'johndoe', email: 'john@example.com', 'job-role': 'tech' };

describe('Users Reducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ids).toEqual([]);
  });

  it('should set loading on loadUsers', () => {
    const state = reducer(undefined, UsersActions.loadUsers());
    expect(state.loading).toBe(true);
  });

  it('should populate users on loadUsersSuccess', () => {
    const state = reducer(undefined, UsersActions.loadUsersSuccess({ users: [mockUser] }));
    expect(state.ids).toContain('1');
    expect(state.loading).toBe(false);
  });

  it('should add user on addUserSuccess', () => {
    const state = reducer(undefined, UsersActions.addUserSuccess({ user: mockUser }));
    expect(state.ids).toContain('1');
  });

  it('should update user on updateUserSuccess', () => {
    const populated = reducer(undefined, UsersActions.loadUsersSuccess({ users: [mockUser] }));
    const updated = { ...mockUser, username: 'janedoe' };
    const state = reducer(populated, UsersActions.updateUserSuccess({ user: updated }));
    expect(state.entities['1']?.username).toBe('janedoe');
  });

  it('should remove user on deleteUserSuccess', () => {
    const populated = reducer(undefined, UsersActions.loadUsersSuccess({ users: [mockUser] }));
    const state = reducer(populated, UsersActions.deleteUserSuccess({ id: '1' }));
    expect(state.ids).not.toContain('1');
  });

  it('should set selectedUserId on selectUser', () => {
    const state = reducer(undefined, UsersActions.selectUser({ id: '1' }));
    expect(state.selectedUserId).toBe('1');
  });
});