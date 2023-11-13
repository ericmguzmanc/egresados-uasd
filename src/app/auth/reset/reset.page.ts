import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  message: string = '';
  token: string = '';
  loading: boolean = false;

  formReset = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Add your code here
    this.activatedRoute.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  get password() {
    return this.formReset.controls.password;
  }
  get confirmPassword() {
    return this.formReset.controls.confirmPassword;
  }

  resetPassword() {
    if (this.formReset.valid) {
      if (this.password.value !== this.confirmPassword.value) {
        console.log('Las contraseñas no coinciden');
        this.message = 'Las contraseñas no coinciden';
      } else {
        this.loading = true;
        this.authService
          .setNewPassword(this.token, this.password.value)
          .subscribe(
            (response) => {
              this.navCtrl.navigateRoot('/tabs/login');
              this.loading = false;
              return;
            },
            (error) => {
              this.message = error.error.message;
              this.loading = false;
            }
          );
        console.log(this.formReset.value);
        this.message = 'Contraseña actualizada';
      }
    } else {
      console.log('Formulario inválido');
      this.message = 'COMPLETE LOS CAMPOS';
    }
    this.loading = false;
  }
}
