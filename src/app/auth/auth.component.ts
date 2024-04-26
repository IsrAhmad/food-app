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
        //TODO: the following line [localStorage.setItem('userToken', res.token);] should be in the complete: () => {},
        //TODO: res.token is because the response from the API returns like so: {
        //TODO: "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyOCwicm9sZXMiOlsiVXNlciIsImNhblVwZGF0ZVVzZXIiLCJjYW5HZXRDdXJyZW50VXNlciIsImNhbkNoYW5nZVBhc3N3b3JkIl0sInVzZXJOYW1lIjoiaXNyYWExMSIsInVzZXJFbWFpbCI6ImlzcmFhLnBpY3R1cmVzMjAyM0BnbWFpbC5jb20iLCJ1c2VyR3JvdXAiOiJTeXN0ZW1Vc2VyIiwiaWF0IjoxNzE0MTUyNDgxLCJleHAiOjE3MTc3NTI0ODF9.LmYKKz3rvSn70wKnzfIVCFTAm4u-NthGP6JtNY1lEK2IZg0NT7yEQpBRtGJj7_h1t4FJEEEA_q3R5zXi2MioT5g189iGXqH9KGMxMrFBtFFHbpuFzUbUo1uD3umUB6N4WiUTPtyVZFJydhlYsWmalsGgIFFmmuBB9Cq783-WgEh5gqqOT-iYGq6Pd-b9owe7kjIyKwTbt3TBERa1ZtsxEe052vAvqVdbzXPDSZgA6ADX9BhZxOykOjctriLr2dWpcSORulaWK973BXn_ojRr0EtABwzHEp9ytmjmyj48JQrS6niX18vyG0R04G7IztAOpvGP_0vLpDUNhznL0CE2BQ",
        //TODO: "expiresIn": "Fri Jun 07 2024 09:28:00 GMT+0000 (Coordinated Universal Time)"
        //TODO: }

        localStorage.setItem('userToken', res.token);
        //TODO: after receiving the token you should nevigate to the dashboard

        this._AuthService.getProfile();//TODO: this line is for refresh
      },
      error: () => {},
      complete: () => {
        this._Router.navigate(['dashboard']);
      },
    });
  }

  // showPassword: boolean = false;
  // password: string = '';
  // email: string = '';
  // loginForm:FormGroup = new FormGroup({
  //   userName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(8), Validators.required]),
  //   email: new FormControl(null, [Validators.email, Validators.required]),
  //   country: new FormControl(null, [Validators.required]),
  //   phoneNumber: new FormControl(null, [Validators.minLength(6), Validators.maxLength(15), Validators.required]),
  //   profileImage: new FormControl(null),
  //   password: new FormControl(null, [Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[A-Z][a-z]{3,8}'), Validators.required]),
  //   confirmPassword: new FormControl(null, [Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[A-Z][a-z]{3,8}'), Validators.required])
  // });

  // togglePassword(): void {
  //   this.showPassword = !this.showPassword;
  // }

  // constructor(private _Auth: Auth) {}
}
