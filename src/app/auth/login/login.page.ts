import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/interfaces/loginRequest.interface';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
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

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (usuario: Usuario[]) => {
          const { egresadoId, token } = usuario[0];
          this.cookieService.set('token', token)
          if (egresadoId) {
            this.router.navigate(['/egresado-edit/', egresadoId]);
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
        complete: () => {
          console.info('complete');
          this.loading = false;
        },
      });
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 3000,
    });

    loading.present();
  }

  onBackButtonClick(): void {
    this.location.back();
  }
}
