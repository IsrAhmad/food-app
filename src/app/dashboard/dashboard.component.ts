import { Component } from '@angular/core';
import { HeaderService } from '../shared/header/services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
