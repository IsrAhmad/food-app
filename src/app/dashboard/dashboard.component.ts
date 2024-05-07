import { Component } from '@angular/core';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { SidebarService } from '../shared/sidebar/services/sidebar.service';

import { HeaderService } from '../shared/header/services/header.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isExpanded: boolean = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }


//   userName: string ='';
//   name: string = '';
//   listData: any;
//   constructor(private _HeaderService:HeaderService) { }

//   ngOnInit() {
//     this.getUserName();
//   }

//   getUserName() {
//     this._HeaderService
//       .getUserName(this.userName, this.name)
//       .subscribe({
//         next: (res) => {
//           this.userName = res.userName;
//           this.name = res.name;
//           console.log(res);
//           this.listData = res;
//         },
//       });
//   }


}
