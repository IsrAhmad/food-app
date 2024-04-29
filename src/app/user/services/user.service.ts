import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient) {

  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get('currentUser');
  }

}
