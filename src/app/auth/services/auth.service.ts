import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';
import { ILogin, IRegister } from '../models/auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private _HttpClient: HttpClient) {}

  login(data: ILogin): Observable<any> {
    return this._HttpClient.post(
      'Users/Login',
      data
    );
  }

  register(data: FormData): Observable<any> {
    return this._HttpClient.post(
      'Users/Register',
      data
    );
  }


  getProfile() {
    let encoded: any = localStorage.getItem('userToken');

    let decoded: any = jwtDecode(encoded);
    console.log(decoded.userGroup);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getProfile();
  }

  getRole() {
    if (localStorage.getItem('userToken') !== null &&
  localStorage.getItem('role') !== null) {
    // this.role = JSON.stringify(localStorage.getItem('role'));
  }
  }

}


