import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginRequest } from 'src/app/shared/interfaces/loginRequest.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private location: Location,
    private loginService: LoginService,
    private router: Router,
    private loadingController: LoadingController
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
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.info('complete');
          //this.loadingCtrl.dismiss();
        },
      });
      this.showLoading();
      this.router.navigateByUrl('/');
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }

  onBackButtonClick(): void {
    this.location.back();
  }
}
