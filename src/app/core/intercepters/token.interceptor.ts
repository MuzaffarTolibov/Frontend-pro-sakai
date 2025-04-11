import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const authToken = tokenService.access_token;
  const router = inject(Router);

  const headers: { [key: string]: string } = {};
  if(authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
  }

  const authRequest = req.clone({ setHeaders: headers });
  return next(authRequest)
      .pipe(
          catchError(err => {
              if (err.status === 401) {
                  router.navigate(['/login']).catch();
              }

              return throwError(err);
          })
      );
};
