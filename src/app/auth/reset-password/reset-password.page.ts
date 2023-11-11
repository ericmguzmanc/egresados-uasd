import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor() { }

  ngOnInit() {
  }
  get email() {
    return this.resetPasswordForm.controls.email;
  }
  resetPassword() {
    console.log(this.resetPasswordForm.value);
  }
}
