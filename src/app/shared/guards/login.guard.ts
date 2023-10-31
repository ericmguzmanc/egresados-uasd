import { inject } from '@angular/core';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../services/storage.service';

export const loginGuard = async () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  const loggedInUserId = await storage.get('loggedInUserId');
  
  console.log('🚀 ~ file: login.guard.ts:13 ~ loginGuard ~ loggedInUserId:', loggedInUserId)

  if (token && loggedInUserId) {
    return true;
  } else {
    return router.navigate(['/tabs/login']);
  }
};
