import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.minLength(12),
      Validators.maxLength(100),
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl(null, [
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()-_+=])[A-Za-zd!@#$%^&*()-_+=]{6,}$'
      ),
      Validators.required,
    ]),
  });

  hide: boolean = true;

  constructor(private _AuthService: AuthService, private _Router:Router) {}

  ngOnInit(): void {
    // this.onLogin();
  }

  onLogin(data: FormGroup) {
    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        //TODO: after receiving the token you should navigate to the dashboard

        this._AuthService.getProfile();//TODO: this line is for refresh
      },
      error: () => {},
      complete: () => {
        this._Router.navigate(['dashboard']);
      },
    });
  }

  goRegister() {
    this._Router.navigate(['auth/register']);
    console.log('REGISTER PAGE');
  }

  goRequest() {
    this._Router.navigate(['auth/forgot-password']);
    console.log('REQUEST PAGE');
  }

  goChangePassword() {
    this._Router.navigate(['dashboard/admin/change-password']);
    console.log('PASSWORD PAGE');
  }
}
