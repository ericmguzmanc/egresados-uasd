import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/interfaces/loginRequest.interface';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { CookieService } from 'ngx-cookie-service';
import { EXPCOOKIE } from 'src/app/shared/constants';

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
    private loginService: LoginService,
    private router: Router,
    private loadingController: LoadingController,
    private cookieService: CookieService
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
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (response: any) => {
          const { userId, token } = response;
          let date = new Date();
          date.setMinutes(date.getMinutes() + EXPCOOKIE);
          this.cookieService.set('token', token, date);
          if (userId) {
            this.router.navigate(['/egresado-edit/', userId]);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('complete');
          loading.dismiss();
          this.disableButton = false;
          this.loginForm.reset();
        },
      });
      
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
    
  }

  async showLoading() {}

  onBackButtonClick(): void {
    this.location.go('/');
  }
}
