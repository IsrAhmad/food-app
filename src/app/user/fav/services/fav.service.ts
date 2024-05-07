import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private _HttpClient: HttpClient) {}

  getAllRecipes(): Observable<any> {
    return this._HttpClient.get('userRecipe');
  }
  onAddFavRecipes(id: number): Observable<any> {
    return this._HttpClient.post('userRecipe', {recipeId: id});
  }
  onDeleteFavRecipes(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`);
  }

}
