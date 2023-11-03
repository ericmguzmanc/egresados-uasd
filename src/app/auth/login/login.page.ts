import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/interfaces/loginRequest.interface';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EXPCOOKIE } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  disableButton = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private cookieService: CookieService,
    private storageService: StorageService,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  async login() {
    if (this.loginForm.valid) {
      this.disableButton = true;
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });

      loading.present();

      this.authService.login(this.loginForm.value as LoginRequest)
        .subscribe((response: any) => {
          if (response) {
            const { userId, token } = response;
            let date = new Date();
            date.setMinutes(date.getMinutes() + EXPCOOKIE);
            this.cookieService.set('token', token, date);
      
            this.storageService.set('loggedInUserId', userId)
      
            this.router.navigate(['/tabs/cuenta']);
            console.info('complete');
            this.disableButton = false;
            this.loginForm.reset();
          }

        loading.dismiss();
      }, 
      async (e) => {
        console.log('🚀 ~ file: login.page.ts:72 ~ LoginPage ~ login ~ error:', e);
        this.disableButton = false;
        const toast = await this.toastCtrl.create({
          message: `${e.error.message}`,
          duration: 1500,
          position: 'top',
        });
    
        await toast.present();

        loading.dismiss();
      });
      
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
    
  }

  onBackButtonClick(): void {
    this.location.go('/');
  }
}
