import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const showAlert = (message: string) => {
    if (isPlatformBrowser(platformId)) {
      window.alert(message);
    }
  };

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Handle Unauthorized (401)
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Handle Forbidden (403)
        // showAlert('You do not have permission to access this resource.');
      } else if (error.status === 404) {
        // Handle Not Found (404)
        router.navigate(['/404']); // Assume you have a 404 page route
      } else {
        // Handle other errors
        // showAlert('An unexpected error occurred. Please try again later.');
      }
      return throwError(() => error); // Re-throw the error for further handling if needed
    })
  );
};
