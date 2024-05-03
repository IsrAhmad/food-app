import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient: HttpClient) {}

  getAllUsers(myParam:any): Observable<any> {
    return this._HttpClient.get('Users', {
      params: myParam,
    });
  }

  onDeleteUser(id:number):Observable<any> {
   return this._HttpClient.delete(`Users/${id}`);
  }

}
