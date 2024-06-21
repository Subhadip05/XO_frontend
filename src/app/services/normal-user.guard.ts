import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalUserGuard: CanActivateFn = (route, state) => {
  const login  = inject(LoginService);
  const router = inject(Router);
  
  if(login.isLoggedIn() && login.getUserRole() == "NORMAL_USER"){
    return true;
  }

  router.navigate(['login']);
  return false;
};
