import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authNotAuthorizedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const router = inject(Router);

  if (token && user) {
    router.navigateByUrl('/dashboard/home');
    return false;
  }

  return true;
};
