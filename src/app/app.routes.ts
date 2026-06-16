import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';

import { authGuard } from './core/guards/auth-guard';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard';
import { Catalogo } from './features/libros/catalogo/catalogo';
import { NuevoLibro } from './features/libros/nuevo-libro/nuevo-libro';
import { EditarLibro } from './features/libros/editar-libro/editar-libro';
import { adminGuard } from './core/guards/admin-guard';
import { NuevoPrestamo } from './features/prestamos/nuevo-prestamo/nuevo-prestamo';
import { ListaPrestamos } from './features/prestamos/lista-prestamos/lista-prestamos';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
  path: 'libros',
  component: Catalogo,
  canActivate: [authGuard]
  },

  {
  path: 'libros/nuevo',
  component: NuevoLibro,
  canActivate: [authGuard, adminGuard]
},

  {
    path: 'libros/editar/:id',
    component: EditarLibro,
    canActivate: [authGuard, adminGuard]
  },

  {
  path: 'prestamos',
  component: ListaPrestamos,
  canActivate: [authGuard]
},

{
  path: 'prestamos/nuevo',
  component: NuevoPrestamo,
  canActivate: [authGuard]
},

  {
    path: '**',
    redirectTo: 'login'
  }
];
