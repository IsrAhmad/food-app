import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedComponent } from './shared.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SharedComponent, SidebarComponent, NavbarComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    RouterModule
  ],
  exports: [
    NgxDropzoneModule,
    SidebarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
