import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(pSize:number, pNumber:number): Observable<any> {
    return this._HttpClient.get('Category', {
      params: { pageSize: pSize, pageNumber: pNumber },
    });
  }

  onAddCategory(itemId:string):Observable<any> {
   return this._HttpClient.post('Category', {name:itemId});
  }

  onEditCategory(name: string, id:number):Observable<any> {
    return this._HttpClient.put(`Category/${id}`, {name});
   }

  onDeleteCategory(id:number):Observable<any> {
    return this._HttpClient.delete(`Category/${id}`);
   }


}
