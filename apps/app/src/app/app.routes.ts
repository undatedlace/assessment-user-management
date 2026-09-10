import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/user-list/user-list')
        .then(m => m.UserList),
    // AuthGuard comes in Phase 4
  },
  { path: '**', redirectTo: 'login' },
];