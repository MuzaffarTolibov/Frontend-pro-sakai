import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const tokenService: TokenService = inject(TokenService);

  if (authService.isAuthenticated) {
      return true
  }

  tokenService.clearTokens();
  router.navigate(['/login']).catch();
  return false;
};
