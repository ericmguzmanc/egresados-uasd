import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { LoginService } from '../../service/auth/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/service/auth/loginRequest';
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
    private loadingCtrl: LoadingController,
    private loginService: LoginService,
    private Ruter : Router
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
          console.error(err)
        },
        complete: () => {
          console.info('complete')
          //this.loadingCtrl.dismiss();
        }
      });
      this.showLoading();
      this.Ruter.navigateByUrl('/');
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration:3000
    });

    loading.present();
  }
}
