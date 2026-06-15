import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.esAdministrador()) {
    return true;
  }

  router.navigate(['/dashboard']);

  return false;
};