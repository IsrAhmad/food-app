import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private _HttpClient: HttpClient) {}

  getUserName(userName:string, name: string): Observable<any> {
    return this._HttpClient.get('Users/currentUser', {
      params: { userName: userName, name:name},
    });
  }

}
