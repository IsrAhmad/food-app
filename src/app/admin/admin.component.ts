import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { HeaderService } from '../shared/header/services/header.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor( private _Router:Router,private _HeaderService:HeaderService) {}

  userName: string ='';
  name: string = '';
  listData: any;


//   userName: string ='';
//   name: string = '';
//   listData: any;
//   constructor(private _HeaderService:HeaderService) { }


  ngOnInit() {
    this.getUserName();
  }

  getUserName() {
    this._HeaderService
      .getUserName(this.userName, this.name)
      .subscribe({
        next: (res) => {
          this.userName = res.userName;
          this.name = res.name;
          console.log(res);
          this.listData = res;
        },
      });
  }


  goRecipes() {
    this._Router.navigate(['dashboard/admin/recipes']);
  }

}
