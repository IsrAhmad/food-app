import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string ='';
  name: string = '';
  listData: any;
  constructor(private _HeaderService:HeaderService) { }

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

}


