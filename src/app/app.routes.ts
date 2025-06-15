import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth-wrapper/auth-wrapper.component').then(
        (m) => m.AuthWrapperComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'todoList',
        loadComponent: () =>
          import('./todo/todo-list/todo-list.component').then(
            (m) => m.TodoListComponent
          ),
      },
    ],
  },
];

export const APP_ROUTES = provideRouter(routes);
