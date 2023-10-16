import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loginGuard = () => {

  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
