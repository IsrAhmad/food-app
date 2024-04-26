import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.minLength(12), Validators.maxLength(100), Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{6,}$'), Validators.required])
  });


  hide: boolean = true;


  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    // this.onLogin();

  }


  onLogin(data: FormGroup) {

    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
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
