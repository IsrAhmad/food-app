import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IRegister, IVerify, IChangePassword, IRequest, IReset } from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // role: string = '';
  role: string | null = null;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }


  getProfile() {
    let encoded: any = localStorage.getItem('userToken');

    let decoded: any = jwtDecode(encoded); //TODO: we put the type as 'any' for now because it wants us to create an interface later
    // console.log(decoded);
    // console.log('DECODED');
    // console.log(decoded.userGroup);
    // console.log('DECODED USER GROUP');

    localStorage.setItem('role', decoded.userGroup); //TODO: we put it in local storage so it doesn't get reset on refresh
    localStorage.setItem('userName', decoded.userName);
    // this.getProfile(); //TODO: this line causes an infinite loop
    // this.role = decoded.userGroup; //it works but fakes
    this.getRole();
  }

  getRole() {
    if (
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('role') !== null
    ) {
      // this.role = JSON.stringify(localStorage.getItem('role')); //TODO: JSON.stringify() puts the result in a string
      this.role = localStorage.getItem('role');

    }
  }

  login(data: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', data);
  }

  verify(data: IVerify): Observable<any> {
    return this._HttpClient.put('Users/verify', data);
  }

  register(data: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this._Router.navigate(['/auth']);
  }

  changePassword(data: IChangePassword): Observable<any>  {
    return this._HttpClient.put('Users/ChangePassword', data);
  }


  request(data: IRequest): Observable<any>  {
    return this._HttpClient.post('Users/Reset/Request', data);
  }

  reset(data: IReset): Observable<any>  {
    return this._HttpClient.post('Users/Reset', data);
  }

}
