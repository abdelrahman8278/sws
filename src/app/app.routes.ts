import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './features/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    title: 'Stellar Media | Strategic Marketing & Institutional Creative — Abu Dhabi',
  },
  {
    path: 'login',
    title: 'تسجيل الدخول | Login — Stellar Media',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    title: 'لوحة التحكم المؤسسية | Dashboard — Stellar Media',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
