import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const bibliotecarioGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (
    auth.esAdministrador() ||
    auth.esBibliotecario()
  ) {
    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};
