import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _HttpClient: HttpClient) {}

  getAllRecipes(myParam:any): Observable<any> {
    return this._HttpClient.get('Recipe', {
      params: myParam,
    });
  }

  getRecipeById(id:number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`); //DON'T FORGET THE $ SIGN !!
  }

  onAddRecipe(data: FormData):Observable<any> {
    return this._HttpClient.post('Recipe', data);
   }

   onEditRecipe(data: FormData, id:number):Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data);
   }

  onDeleteRecipe(id:number):Observable<any> {
   return this._HttpClient.delete(`Recipe/${id}`);
  }

  getTags(): Observable<any> {
    return this._HttpClient.get('tag');
  }


}
