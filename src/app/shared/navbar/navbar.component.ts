import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  imagePath: string = '';
  imgSrc: string = '';
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  emptyImg: string = '../../../assets/images/default-user.png';

  userName: string = '';
  name: string = '';
  listData: any;


  constructor(
    private _Router: Router,
    private _NavbarService: NavbarService
  ) {}


  ngOnInit() {
    this.getUserName();
    // this.getCurrentUsersData();
  }

  getUserName() {
    this._NavbarService
      .getUserName(this.userName, this.name, this.imagePath, this.imgSrc)
      .subscribe({
        next: (res) => {
          this.userName = res.userName;
          this.name = res.name;
          this.imagePath = res.imagePath;
          this.imgSrc = res.imgSrc;
          console.log(res);
          this.listData = res;
        },
      });
  }

}
