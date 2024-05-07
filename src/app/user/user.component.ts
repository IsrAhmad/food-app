import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor( private _Router:Router) {}

  goRecipes() {
    this._Router.navigate(['dashboard/user/user-recipes']);
  }

}
