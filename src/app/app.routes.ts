import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/page/auth/login/login.component';
import { DashboardComponent } from './presentation/layouts/dashboard/dashboard.component';
import { authAuthorizedGuard } from './use-case/guard/auth-authorized.guard';
import { authNotAuthorizedGuard } from './use-case/guard/auth-not-authorized.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [authNotAuthorizedGuard],
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authAuthorizedGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./presentation/page/home/home.component'),
      },
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
];
