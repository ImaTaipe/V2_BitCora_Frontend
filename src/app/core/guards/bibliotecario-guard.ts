import { CanActivateFn } from '@angular/router';

export const bibliotecarioGuard: CanActivateFn = (route, state) => {
  return true;
};
