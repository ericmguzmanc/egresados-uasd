import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:  new FormControl('', Validators.required),
  });
  
  constructor() { }

  ngOnInit() {
  }
  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }
  login(){
    console.log(this.loginForm.status);
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      console.log("Error");
    }
  this.loginForm.reset();
  
}

}