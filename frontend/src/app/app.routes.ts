import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Clientes } from './pages/clientes/clientes';
import { Vehiculos } from './pages/vehiculos/vehiculos';
import { Servicios } from './pages/servicios/servicios';
import { MainLayout } from './layout/main-layout/main-layout';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'clientes', component: Clientes },
      { path: 'vehiculos', component: Vehiculos },
      { path: 'servicios', component: Servicios },
    ],
  },

  { path: '**', redirectTo: 'login' },
];