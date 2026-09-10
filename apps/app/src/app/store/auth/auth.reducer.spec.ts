import { authFeature } from './auth.reducer';
import { AuthActions } from './auth.actions';

const reducer = authFeature.reducer;

describe('Auth Reducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' } as any);
    expect(state).toEqual({ isAuthenticated: false, loading: false, error: null });
  });

  it('should set loading=true on login', () => {
    const state = reducer(undefined, AuthActions.login({ username: 'admin', password: 'admin123' }));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set isAuthenticated=true on loginSuccess', () => {
    const state = reducer(undefined, AuthActions.loginSuccess());
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('should set error on loginFailure', () => {
    const state = reducer(undefined, AuthActions.loginFailure({ error: 'Invalid credentials' }));
    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
  });

  it('should reset state on logout', () => {
    const loggedIn = { isAuthenticated: true, loading: false, error: null };
    const state = reducer(loggedIn, AuthActions.logout());
    expect(state.isAuthenticated).toBe(false);
  });
});