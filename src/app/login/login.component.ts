import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from '../_models/loginmodel';
import { TokenModel } from '../_models/tokenmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  router: Router
  http: HttpClient
  email: FormControl
  snackBar: MatSnackBar
  loginModel: LoginModel

  constructor(http: HttpClient, snackBar: MatSnackBar, router: Router) {
    this.snackBar = snackBar
    this.http = http
    this.router = router
    this.loginModel = new LoginModel()
    this.email = new FormControl('', [Validators.required, Validators.email])
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value!'
    }
    return this.email.hasError('email') ? 'Not a valid email' : ''
  }
  public checkInputs(): boolean {
    return this.loginModel.email !== '' && this.loginModel.password !== ''
  }

  public sendLoginCredentials() {
    this.http.post<TokenModel>("https://practiceapi.nikprog.hu/Auth", this.loginModel).subscribe(
      (success) => {
        localStorage.setItem('nikprog-practiceapi-token', success.token)
        localStorage.setItem('nikprog-practiceapi-token-expiration', success.expiration.toString())
        console.log("Success - " + success.token)
        this.router.navigate(['/list-teachers'])
      },
      (error) => {
        this.snackBar.open(
          error.message, "Close", { duration: 5000 })
      }
    )
  }
}
