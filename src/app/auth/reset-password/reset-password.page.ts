import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastController } from '@ionic/angular';

/**
 * Componente para la página de restablecimiento de contraseña.
 * @remarks
 * Este componente contiene un formulario para enviar un correo electrónico con un enlace para restablecer la contraseña.
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  message: string = '';
  showSuccessMsg: boolean = false;

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
  }


  resetPassword() {
    this.authService.getResetPasswordToken(this.resetPasswordForm.value.email).subscribe( async (response: any) => {
      this.message = response.message;

      if (response.code === '000') {
        this.showSuccessMsg = true;
      }

      const toast = await this.toastCtrl.create({
        message: `${this.message}`,
        duration: 1500,
        position: 'top',
      });
  
      await toast.present();
    });
  }
}
