import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {


  constructor(private _HttpClient: HttpClient) {}

  userLogin(userData: any): Observable<any> {
    return this._HttpClient.post(
      'https://upskilling-egypt.com:3006/api/v1/Users/Login',
      userData
    );
  }
}
