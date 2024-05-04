import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVerify } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  constructor(private _HttpClient: HttpClient) {}

  // getAllCategories(pSize:number, pNumber:number): Observable<any> {
  //   return this._HttpClient.get('Category', {
  //     params: { pageSize: pSize, pageNumber: pNumber },
  //   });
  // }

  // "email": "string",
  // "code": "string"

  // verify(data: IVerify): Observable<any> {
  //   return this._HttpClient.post('Users/verify', data);
  // }

  // onAddCode(userEmail:string, verifyCode:string):Observable<any> {
  //  return this._HttpClient.post('Users/verify', {email:userEmail, code:verifyCode});
  // }
}
