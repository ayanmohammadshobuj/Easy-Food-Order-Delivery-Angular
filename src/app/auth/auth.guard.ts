import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = authService.getRole();

  if (authService.isAuthenticated() && userRole === expectedRole) {
    return true;
  }

  // Redirect to login if not authorized
  router.navigate(['/login']);
  return false;
};
