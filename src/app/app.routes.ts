import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component'),
    canActivate: [authGuard],
  },
  {
    path: 'addShift',
    loadComponent: () => import('./shifts/shift-editor/shift-editor.component'),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login-form/login-form.component'),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
